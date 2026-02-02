## Objetivo

Refactorizar los scripts actuales de migración (HTML Dokka → MDX Docusaurus) en un **nuevo exporter** más simple, modular y robusto, con especial foco en:

- **Modelo de datos explícito** por tipo de página Dokka.
- **Parsers desacoplados** (stateless) apoyados por utilidades de extracción.
- **Control de “sobre-generación”** (evitar MDX redundantes, ej. property pages).
- **Resolución de URLs fiable** incluso cuando intencionadamente no generamos ciertas páginas.
- **Nueva experiencia de render** en `src/components/api` (ApiDoc*), sin depender tanto de HTML estático.
- **Mantener interfaz de CLI** y salida (logging + conteos) similar a `scripts` actuales.

> Nota: el código generado, ejemplos y comentarios deben estar en inglés.

---

## Estado deseado (arquitectura)

### 1) Capa de datos (Definitions)

Cada HTML de Dokka se convierte a una definición (POJO) tipada, con prefijo `Ex` (Exporter) para distinguirlo.

- **`ExApiPageDefinition`** (base)
  - `pageType`: `'library' | 'package' | 'classlike' | 'member' | ...`
  - `title`: string
  - `namespace`: string (si aplica)
  - `sourcePath`: string (ruta input HTML)
  - `outputPath`: string (ruta output MDX, si se genera)
  - `slug`: string (slug Docusaurus para esa página)
  - `items`: `ExApiItemDefinition[]` (si aplica)
  - `meta`: datos extra (breadcrumbs, typeInfo, etc.)

Subtipos:

- **`ExApiLibraryPageDefinition`**
- **`ExApiPackagePageDefinition`**
- **`ExApiClassPageDefinition`**
- **`ExApiMemberPageDefinition`**

Modelos auxiliares sugeridos:

- **`ExApiItemDefinition`**: `name`, `kind`, `signature`, `description`, `href?`, `anchors?`, `platforms?`, `sourceUrl?`
- **`ExApiCodeBlockDefinition`**: `platform`, `lines`, `links[]`, `sourceUrl?`
- **`ExApiLinkDefinition`**: `text`, `href`, `resolvedTo?`, `kind` (`'internal' | 'external' | 'anchor'`)
- **`ExApiDiagnostics`**: warnings/errors por página (para report final)

### 2) Parsers (HTML → Definitions)

Separar **detección de tipo** y **parseo**. Cada parser conoce un tipo de página y produce su definición correspondiente.

- `ExApiPageParser` (interface)
  - `canParse(html: string, $: CheerioAPI): boolean`
  - `parse(ctx: ExApiParseContext): ExApiPageDefinition`

Implementaciones:

- `ExApiLibraryPageParser`
- `ExApiPackagePageParser`
- `ExApiClassPageParser`
- `ExApiMemberPageParser`

Contexto de parseo:

- `ExApiParseContext`
  - `$: CheerioAPI`
  - `html: string`
  - `sourcePath: string`
  - `routeRegistry: ExApiRouteRegistry` (ver URLs)
  - `tree: ExApiTree` (ver tracking jerárquico)
  - `options: ExApiExportOptions`

### 3) Utilidades stateless (Extractors)

Mover la lógica “sucia” de selectores y normalización a funciones puras reutilizables, evitando clases con estado.

Ejemplos de utilidades:

- `extractTitle($): string`
- `extractBreadcrumbs($): string[]`
- `extractNamespaceFromBreadcrumbs(breadcrumbs): string`
- `extractDeclarationName($element): string`
- `extractDescription($element): string`
- `extractTokenType($element): ExApiTokenType`
- `extractHref($element): string`
- `normalizeDokkaHref(href): NormalizedHref` (quita `.html`, maneja `index`, anchors, etc.)
- `extractCodeBlocks($element): ExApiCodeBlockDefinition[]`

Regla: **nada de side-effects** (no escribir archivos, no logs dentro de extractors).

### 4) Writers (Definitions → MDX)

Un writer por tipo de página, responsable únicamente de convertir la definición a MDX.

- `ExApiPageWriter<T extends ExApiPageDefinition>`
  - `write(def: T, ctx: ExApiWriteContext): ExApiWriteResult`

Implementaciones:

- `ExApiLibraryPageWriter`
- `ExApiPackagePageWriter`
- `ExApiClassPageWriter`
- `ExApiMemberPageWriter` (si se decide generar algunos)

Contexto de escritura:

- `ExApiWriteContext`
  - `routeRegistry`
  - `componentsConfig` (qué componentes usar en render)
  - `options`

### 5) Orquestación (Exporter)

Nueva carpeta:

- `WebZite/exporter/`
  - `cli.ts` (mantener input/output similar a scripts actuales)
  - `exporter.ts` (pipeline)
  - `fs/` (lectura/escritura y utilidades de rutas)
  - `parse/` (parsers + extractors)
  - `write/` (writers + templates)
  - `routing/` (tree + registry + normalización)
  - `reporting/` (logging + summary)

Compatibilidad:

- Mantener flags del script actual (input dir, output dir, filtros, etc.).
- Mantener el summary final: `converted`, `skipped`, `failed` + lista resumida de problemas.

---

## Control de sobre-generación (skip rules)

### Problema
Hay páginas Dokka extremadamente pequeñas (ej. entries/properties simples) que ya están explicadas en el `index` superior. Generarlas crea:

- Ruido en la API.
- Miles de ficheros sin valor.
- Y lo más importante: **roturas de enlaces** cuando se decide no generarlas.

### Propuesta: Política de generación basada en “valor”

Definir una función central:

- `shouldGeneratePage(node: ExApiTreeNode, def: ExApiPageDefinition): ExApiGenerationDecision`
  - `generate: boolean`
  - `reason: 'redundant-member' | 'no-description' | 'config-disabled' | ...`

Reglas iniciales sugeridas:

- **Member pages**: generar solo si tienen descripción significativa (o contenido adicional) que no aparece ya en el padre.
- **Enum entry / val / var “simples”**: no generar páginas individuales (se muestran en el padre).
- Permitir excepciones por configuración (allowlist/denylist).

### Árbol de tracking (ExApiTree)

Durante el scan del directorio se construye un árbol que refleja la jerarquía de Dokka (carpetas y páginas).

Esto permite:

- Saber qué `index.html` “explica” qué subelementos.
- Marcar nodos como `skipped` y almacenar el motivo.
- Resolver enlaces de forma consistente (ver siguiente sección).

---

## Gran tema: URLs y resolución de enlaces

### Problema
La documentación tiene muchísimas URLs. Si capamos páginas, los enlaces originales se rompen (build warnings) y la navegación empeora.

### Principio
Los modelos (`ExApi*Definition`) deben facilitar **añadir o quitar links** de forma segura sin depender ciegamente del `href` de Dokka.

### Propuesta: Route Registry + Link Resolver

Crear un registro de rutas centralizado:

- `ExApiRouteRegistry`
  - `registerInput(sourcePath) -> routeId`
  - `registerOutput(routeId, { slug, outputPath })`
  - `markSkipped(routeId, reason)`
  - `resolveInternalHref(fromRouteId, rawHref) -> ResolvedLink`

Y un resolver:

- `resolveInternalHref` aplica:
  - Normalización (`.html` fuera, `index` → directorio, trailing slash coherente).
  - Traducción de “ruta dokka” → “ruta docusaurus” usando el árbol.
  - Si el target está `skipped`, se devuelve una decisión:
    - `removeLink` (render como texto)
    - o `redirectToParent` (si existe un padre que contenga la info)

Reglas recomendadas:

- Si el enlace apunta a un “member page” que no generamos, **no enlazar** (texto plano) o enlazar al padre con anchor si existe.
- Si el enlace apunta a un `index.html#anchor`, convertirlo a `./#anchor` o a la ruta equivalente sin `index.html`.

### Validación automática
Añadir un paso de validación post-generación:

- Recorrer todas las definiciones generadas.
- Recoger todos los enlaces internos generados.
- Confirmar que cada link resuelve a:
  - una página generada, o
  - una estrategia aceptada (texto plano / redirectToParent).

Resultado: report final con:

- `brokenLinkCandidates` (debería ser 0).
- `autoFixedLinks` (cuántos se reescribieron).
- `removedLinks` (cuántos se degradaron a texto).

---

## Nueva experiencia de render en `src/components/api`

### Objetivo
No depender del HTML estático para la navegación/UX. El output MDX debe ser “data-driven” y el render lo debe hacer React.

Acciones:

- Crear carpeta: `WebZite/src/components/api/`
- Componentes con prefijo `ApiDoc*`:
  - `ApiDocHeader`
  - `ApiDocBreadcrumbs`
  - `ApiDocTypeBadge`
  - `ApiDocItemList`
  - `ApiDocItem`
  - `ApiDocCodeBlock`
  - `ApiDocLink` (link inteligente que sabe degradar a texto si hace falta)

Notas:

- Inspiración: `src/components/Documentation`, pero **diseño nuevo y coherente**.
- Usar tailwind con prefijos `tw:` (como en el resto del proyecto).

---

## `sourceDocsGfm`

No se utiliza como input principal (Dokka lo genera con soporte limitado), pero:

- Mantenerlo fuera del pipeline por defecto.
- Considerar un modo opcional de “fallback” o comparación (para extraer texto/markdown si fuese útil).

---

## Plan de implementación (pasos)

### Fase 0: Preparación

- Crear `WebZite/exporter/` con estructura base.
- Definir `ExApiExportOptions` y CLI mínima compatible.
- Añadir `reporting` y `ExApiDiagnostics`.

### Fase 1: Routing/Tree/Registry primero (antes de parsear en serio)

- Implementar `ExApiTree` (scan directorio, nodos, parent/children).
- Implementar `ExApiRouteRegistry`.
- Implementar `normalizeDokkaHref` + `resolveInternalHref`.

Entrega de esta fase:

- Un comando que hace scan y produce un reporte (sin generar MDX) mostrando:
  - cuántos HTML detectados,
  - cuántos “candidatos a skip”,
  - y ejemplos de resolución de enlaces.

### Fase 2: Parsers mínimos por tipo

- `ExApiLibraryPageParser` + `ExApiPackagePageParser` + `ExApiClassPageParser`.
- `ExApiMemberPageParser` solo si es necesario (probablemente sí, pero con `shouldGeneratePage`).

En esta fase, priorizar:

- Extraer `title`, `namespace`, `items` (listados), `codeBlocks`.
- Dejar los “detalles bonitos” para después.

### Fase 3: Writers + templates

- Writers por tipo:
  - Generar MDX con frontmatter, imports y uso de `ApiDoc*` components.
- Mantener el output summary:
  - `converted`, `skipped`, `failed`
  - lista corta de fallos (paths) y razones de skip.

### Fase 4: Integración con Docusaurus (UX + links)

- En `ApiDocLink`, aplicar la decisión del resolver:
  - render `<Link to=...>` si existe
  - render `<span>` si no existe
  - opcionalmente render “(see parent)” si se reescribe

### Fase 5: Migración gradual desde `scripts`

- Mantener `scripts` funcionando mientras `exporter` madura.
- Reutilizar utilidades existentes cuando aporten valor (sin arrastrar acoplamiento).
- Cuando `exporter` cubra el 80–90%:
  - desactivar generación antigua,
  - mantener un flag de fallback temporal.

---

## Reglas/criterios de éxito

- **Build sin broken links** (idealmente 0 warnings).
- **Menos MDX** generados (reducción significativa), sin pérdida de información útil.
- **Links internos consistentes** (sin `index.html`, sin duplicaciones, trailing slash coherente).
- **Componentes `ApiDoc*`** renderizando la API con UX moderna.
- CLI estable: mismas entradas, summary claro, logs no verborréicos.

---

## Detalles extra que conviene añadir (recomendaciones)

- **Configuración**: allowlist/denylist por ruta para casos especiales.
- **Caché opcional**: cachear parseos por hash del HTML si el pipeline es lento.
- **Modo “diagnóstico”**: exportar JSON con `ExApiPageDefinition` para inspección rápida.
- **Métricas**: top razones de skip, top URLs reescritas, top fallos.

---

## Estado actual del refactor

- **Fase 0 (Preparación)**: completada. Se creó la estructura base de `WebZite/exporter`, se definieron los modelos `Ex*` y se mantiene la CLI tradicional con el resumen de `converted/skipped/failed`.
- **Fase 1 (Routing/tree/registry)**: completada parcialmente. Existe un árbol jerárquico y un registro de rutas, pero aún no hay validación automática de cada enlace.
- **Fase 2 (Parsers)**: completada. Los parsers nuevos generan definiciones limpias por tipo de página.
- **Fase 3 (Writers y templates)**: completada. Generan MDX con los nuevos componentes `ApiDoc*` y respetan el logger/summary.
- **Fase 4 (Texto y UX)**: completada a nivel de componentes y estilos, aunque los `ApiDocLink` todavía deben manejar mejor los esquemas de URL del build.
- **Fase 5 (Migración gradual)**: en progreso. El nuevo exporter está operativo pero las antiguas rutas siguen existiendo en paralelo para comparar resultados.

### Pendiente

- **URLs aún rotas**: Docusaurus sigue marcando `broken links` en `/api/` porque algunos MDX todavía contienen rutas que no concuerdan con la estructura nueva. Hay que depurar el resolver de enlaces y la normalización en ese registro de rutas.
