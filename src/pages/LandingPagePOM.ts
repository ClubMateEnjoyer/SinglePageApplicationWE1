import { ApplicationManager } from "../ApplicationManager.js";
import { User } from "../domain/User.js";
import { AbstractPOM } from "./AbstractPOM.js";
import { ImpressumNoLoginPagePOM } from "./ImpressumNoLoginPagePOM.js";

export class LandingPagePOM {
    public async init(): Promise<void> {
        await AbstractPOM.showPage('./html/landingPage.html');

        const appManager = ApplicationManager.getInstance();
        const pageContent = document.getElementById("PageContent") as HTMLElement;
        const loginForm = document.getElementById("FormLogin") as HTMLFormElement;
        const signupForm = document.getElementById("FormSignup") as HTMLFormElement;
        const linkShowSignupDialog = document.getElementById('LinkShowSignupDialog');
        const linkShowLoginDialog = document.getElementById('LinkShowLoginDialog');
        const linkImpressum = document.getElementById('LinkImpressum');
        const buttonSignupUser = document.getElementById('ButtonSignupUser');
        const buttonLoginUser = document.getElementById('ButtonLoginUser');

        // zwischen signup und login wechseln
        linkShowSignupDialog?.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.reset();
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        });

        linkShowLoginDialog?.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.reset();
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        }); 
        
        //impressum (ohne login) zeigen
        linkImpressum?.addEventListener('click', (e) => {
            e.preventDefault();
            pageContent.innerHTML = '';
            new ImpressumNoLoginPagePOM().init();           
        }); 

        

        
        buttonSignupUser?.addEventListener('click', async (e) => { 
            e.preventDefault();
            const username = (document.getElementById("FormSignupUsername") as HTMLInputElement).value.trim();
            const firstname = (document.getElementById("FormSignupFirstName") as HTMLInputElement).value.trim();
            const lastname = (document.getElementById("FormSignupLastName") as HTMLInputElement).value.trim();
            const password = (document.getElementById("FormSignupPassword") as HTMLInputElement).value.trim();

            if (!username || !password) {
                appManager.showToast("User ID and password cannot be empty.");
                return;
            }

            const newUser = new User(username, firstname, lastname, password);
            const success = await appManager.addUser(newUser);
            if (success) {
                signupForm.reset();
            }
        });

        buttonLoginUser?.addEventListener('click', async (e) => { 
            e.preventDefault();
            const username = (document.getElementById("FormLoginUsername") as HTMLInputElement).value.trim();
            const password = (document.getElementById("FormLoginPassword") as HTMLInputElement).value.trim();

            if(!username || !password) {
                appManager.showToast("User ID and password cannot be empty.")
                return;
            }

            const success = await appManager.login(username, password); 
            if(success) {
                loginForm.reset();
                await appManager.loadStartPage(); 
            }
        });
    }
}