import { getAll, put } from "./store.js";
import {
  SEED_OBSERVATION,
  SEED_CONSENT,
  SEED_SOURCE,
  SEED_RISK,
  SEED_ACCESSIBILITY,
} from "./seed-data.js";
import { initRouter } from "./router.js";

async function seedIfEmpty() {
  const existing = await getAll("observations");
  if (existing.length > 0) return;
  await Promise.all([
    put("observations", SEED_OBSERVATION),
    put("consent", SEED_CONSENT),
    put("sources", SEED_SOURCE),
    put("risks", SEED_RISK),
    put("accessibility", SEED_ACCESSIBILITY),
  ]);
}

function initBlindEditorMode() {
  const toggle = document.querySelector("[data-blind-editor-toggle]");
  if (!toggle) return;
  const activate = (event) => {
    event.preventDefault();
    const active = document.body.classList.toggle("blind-editor-mode");
    toggle.setAttribute("aria-pressed", String(active));
  };
  toggle.addEventListener("click", activate);
  // The toggle is an <a role="button">: native anchors fire "click" on
  // Enter but not on Space, while ARIA's button pattern expects both
  // (WCAG 4.1.2 / 2.1.1). Add Space explicitly; Enter already works.
  toggle.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.key === " ") activate(event);
  });
}

async function init() {
  initBlindEditorMode();
  await seedIfEmpty();
  initRouter();
}

init();
