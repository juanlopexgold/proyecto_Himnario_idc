import { Header } from "./Componentes/Header.js";
import { Main } from "./Componentes/Main.js";
import { Router } from "./Componentes/router.js";
import { startBackgroundSlider } from "./Componentes/backgroundSlider.js";

export function App() {
    const $root = document.getElementById("root");
    $root.innerHTML = null;

    $root.appendChild(Header());
    $root.appendChild(Main());

    Router();
    startBackgroundSlider();
}