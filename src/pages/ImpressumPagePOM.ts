import { ApplicationManager } from "../ApplicationManager.js";
import { AbstractPOM } from "./AbstractPOM.js";
import { LandingPagePOM } from "./LandingPagePOM.js";
import { StartPagePOM } from "./StartPagePOM.js";
import { UserManagementPagePOM } from "./UserManagementPagePOM.js";

export class ImpressumPagePOM {
    public async init(): Promise<void> {
        await AbstractPOM.showPage('./html/impressumPage.html');

        const appManager = ApplicationManager.getInstance();
        const linkRoot = document.getElementById('LinkRoot');
        const linkImpressum = document.getElementById('LinkImpressum');
        const linkLogout = document.getElementById('LinkLogout');
        const linkUserManagemant = document.getElementById('LinkUserManagement'); 

        // startseite (für eingeloggte user)
        linkRoot?.addEventListener('click', async (e) => {
            e.preventDefault();
            await new StartPagePOM().init();
        });

        linkImpressum?.addEventListener('click', async (e) => { 
            e.preventDefault();
            await this.init(); 
        });

        // logout Link
        linkLogout?.addEventListener('click', async (e) => { 
            e.preventDefault();
            appManager.logout(); 
            await appManager.loadLandingPage(); 
        });

        // Link zur User Management Seite
        linkUserManagemant?.addEventListener('click', async (event) => { 
            event.preventDefault();
            await new UserManagementPagePOM().init(); 
        });
    }
}