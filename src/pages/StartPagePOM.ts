import { ApplicationManager } from "../ApplicationManager.js";
import { AbstractPOM } from "./AbstractPOM.js";
import { ImpressumPagePOM } from "./ImpressumPagePOM.js";
import { UserManagementPagePOM } from "./UserManagementPagePOM.js";

export class StartPagePOM {
    public async init(): Promise<void> {
        
        const appManager = ApplicationManager.getInstance();

        await AbstractPOM.showPage('./html/startingPage.html')

        const userCount = document.getElementById('UserCount') as HTMLSpanElement;
        const linkLogout = document.getElementById('LinkLogout') as HTMLElement;
        const linkImpressum = document.getElementById('LinkImpressum') as HTMLAnchorElement;
        const linkUserManagemant = document.getElementById('LinkUserManagement') as HTMLAnchorElement;
        const startLinkUsrMgmt = document.getElementById('StartPageLinkUserManagement') as HTMLAnchorElement;

        userCount.innerHTML = appManager.getUserCount().toString();
        const currentUser = appManager.getLoggedInUser();

        linkImpressum?.addEventListener('click', (e) => {
            e.preventDefault();
            new ImpressumPagePOM().init();
        });

        linkUserManagemant?.addEventListener('click', (e) =>{
            e.preventDefault();
            new UserManagementPagePOM().init();
        });

        startLinkUsrMgmt?.addEventListener('click', (e) => {
            e.preventDefault();
            new UserManagementPagePOM().init();
        });

        linkLogout?.addEventListener('click', async (e) => {
            appManager.logout();
            appManager.loadLandingPage();
        });
        
        
        const count = await appManager.getUserCount();
        userCount.textContent = count.toString();
    

        const welcomeText = document.getElementById("StartPageWelcomeText");
        if (welcomeText && currentUser) {
            let name: string;

            if (currentUser.firstName && currentUser.lastName) {
                name = currentUser.firstName + " " + currentUser.lastName;
            } else {
                name = currentUser.userID;
            }
            welcomeText.textContent = "Willkommen, " + name + "!";
        }
    }
}