import { AbstractPOM } from "./AbstractPOM.js";
import { LandingPagePOM } from "./LandingPagePOM.js";

export class ImpressumNoLoginPagePOM {
    public async init(): Promise<void> {
        await AbstractPOM.showPage('./html/impressumNoLoginPage.html');

        const linkRoot = document.getElementById('LinkRoot');
        const linkImpressum = document.getElementById('LinkImpressum');

        linkRoot?.addEventListener('click', async (e) => { 
            e.preventDefault();
            await new LandingPagePOM().init(); 
        });

        linkImpressum?.addEventListener('click', async (e) => { 
            e.preventDefault();
            await this.init(); 
        });
    }
}