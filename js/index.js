import { App } from "./app.js";
import { Router } from "./Componentes/router.js";

document.addEventListener("DOMContentLoaded", () => {
    App();
    Router();
});
window.addEventListener("hashchange", Router);