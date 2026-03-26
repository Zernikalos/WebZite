/**
 * Mounts a tiny <select> that lists available actions.
 *
 * Expected action objects are opaque (from the Zernikalos SDK). We only try to
 * read a reasonable label (`name`/`id`) if present, otherwise we fall back to
 * an index-based label.
 */
export function mountActionSelector({
  actions,
  onSelect,
  parent = document.body,
  label = "Action",
  initialIndex = 0,
} = {}) {
  const safeActions = Array.isArray(actions) ? actions : [];
  const safeOnSelect = typeof onSelect === "function" ? onSelect : () => {};

  const wrap = document.createElement("div");
  wrap.className = "zk-action-selector";

  const labelEl = document.createElement("label");
  labelEl.className = "zk-action-selector__label";

  const selectEl = document.createElement("select");
  selectEl.className = "zk-action-selector__select";

  const selectId = `zk-action-select-${Math.random().toString(16).slice(2)}`;
  labelEl.setAttribute("for", selectId);
  labelEl.textContent = label;
  selectEl.id = selectId;

  function actionLabel(action, index) {
    const name = action?.name?.toString?.();
    if (name && name.trim()) return name;
    const id = action?.id?.toString?.();
    if (id && id.trim()) return id;
    return `Action ${index + 1}`;
  }

  safeActions.forEach((action, i) => {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = actionLabel(action, i);
    selectEl.appendChild(opt);
  });

  selectEl.disabled = safeActions.length === 0;
  const clampedInitial = Math.min(
    Math.max(0, Number.isFinite(initialIndex) ? initialIndex : 0),
    Math.max(0, safeActions.length - 1),
  );
  selectEl.value = String(clampedInitial);

  selectEl.addEventListener("change", () => {
    const idx = Number.parseInt(selectEl.value, 10);
    const action = safeActions[idx];
    if (action) safeOnSelect(action, idx);
  });

  wrap.appendChild(labelEl);
  wrap.appendChild(selectEl);
  parent.appendChild(wrap);

  if (safeActions[clampedInitial]) safeOnSelect(safeActions[clampedInitial], clampedInitial);

  return {
    root: wrap,
    select: selectEl,
    setDisabled(disabled) {
      selectEl.disabled = Boolean(disabled);
    },
    setValue(index) {
      const idx = Math.min(Math.max(0, index | 0), Math.max(0, safeActions.length - 1));
      selectEl.value = String(idx);
      selectEl.dispatchEvent(new Event("change"));
    },
  };
}

