import { ApplicationManager } from "./ApplicationManager.js";

window.addEventListener("DOMContentLoaded", async () => {
    console.log("Application loaded.");
    const applicationManager = ApplicationManager.getInstance(); 
    await applicationManager.init();
});
