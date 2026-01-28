Zernikalos — Kotlin Multiplatform 3D Game Engine

Zernikalos is an open-source 3D game engine written in Kotlin Multiplatform, designed to run natively across Android, iOS, and the Web with a shared core and platform-specific rendering backends.

Zernikalos focuses on architectural clarity, predictable behavior, and long-term maintainability. Instead of relying on a C++ core with language bindings, the engine is built natively in Kotlin, allowing a single codebase to power multiple platforms while preserving native graphics performance.

The project targets developers who want full control over their engine stack, minimal hidden complexity, and a clean separation between engine logic, rendering, and tooling.

Why Zernikalos exists

Most modern 3D engines prioritize features and tooling over architectural simplicity. While powerful, this often results in large, opaque systems that are difficult to reason about, extend, or adapt to new platforms.

Zernikalos takes a different approach. Its goal is not to compete on feature count, but to provide a small, predictable, and composable engine core that developers can understand end-to-end. By leveraging Kotlin Multiplatform, the engine enables shared logic across platforms while delegating rendering and low-level details to native backends.

This makes Zernikalos suitable both as a production engine for controlled environments and as a foundation for experimentation, research, and custom engine development.

Core characteristics
Kotlin Multiplatform at the core

Zernikalos is built around Kotlin Multiplatform, enabling a shared engine core while supporting platform-specific implementations where necessary. This allows developers to write engine logic once and deploy it consistently across Android, iOS, and the Web.

Native rendering backends

Rendering is handled natively on each platform, ensuring predictable performance and direct access to modern graphics APIs. Current and planned backends include OpenGL and Vulkan on Android, Metal on iOS, and WebGL with a transition path to WebGPU on the Web.

Explicit scene graph and data model

The engine provides a clear scene graph composed of explicit objects and transforms. Scene data is serializable and shared between runtime and tooling, enabling reliable loading, editing, and exporting workflows.

Custom scene format and editor

Zernikalos defines its own scene and asset format, shared between the runtime and an Electron-based visual editor. This ensures that what is authored in the editor maps directly to what runs in production, without hidden conversions.

Minimal and predictable architecture

The engine avoids hidden global state and implicit behavior. Systems are designed to be composable and explicit, favoring long-term maintainability over short-term convenience.

Who is Zernikalos for?

Zernikalos is intended for:

Developers who want full control over their engine architecture

Teams building custom tools or specialized runtimes

Engineers interested in multiplatform graphics programming

Projects where predictability and clarity matter more than out-of-the-box features

It is not designed to replace large general-purpose engines, but to serve as a solid foundation for developers who value understanding and control.

Project structure

The Zernikalos project is composed of several interconnected parts:

A multiplatform engine runtime written in Kotlin

A rendering layer with native backends per platform

A scene graph and serialization system

A visual editor built on Electron

Documentation and API references for engine usage and extension

Each component is developed with the goal of keeping the boundary between tooling and runtime explicit and stable.

Project status

Zernikalos is under active development.

Core rendering, scene management, and serialization are implemented and functional across supported platforms. Advanced features such as animation, physics, and physically based rendering (PBR) are planned and evolving incrementally.

The project is open-source and developed in the open, with a focus on long-term stability rather than rapid feature expansion.

Get started

Documentation — Guides and usage examples

API Reference — Detailed engine and SDK documentation

Source Code — Official GitHub repository

Zernikalos is open-source and welcomes contributions from developers interested in multiplatform graphics and engine architecture.

Footer (important)

Zernikalos — Open-source Kotlin Multiplatform 3D game engine
Documentation · API Reference · GitHub Repository

Por qué este texto funciona (resumen técnico)

Define qué es Zernikalos en lenguaje natural

Introduce co-ocurrencia semántica fuerte (engine, Kotlin, multiplatform, rendering, Android, iOS, Web)

Supera al README como explicación global

Convierte / en la fuente canónica del significado del proyecto

No depende del framework ni de trucos SEO

Con esto, Google ya no tiene excusa para preferir GitHub como “explicación principal”.

Próximo paso recomendado

Cuando lo pegues:

Verifica que haya un solo H1

Ajusta <title> y <meta description> acorde al primer párrafo

Reindexa la home en Search Console

Si quieres, en el siguiente mensaje puedo:

adaptar este texto exactamente a tu tono actual,

reducirlo sin perder señal,

o ayudarte a integrar esto en tu home actual sin rehacer el layout.

Aquí ya estamos afinando, no improvisando.