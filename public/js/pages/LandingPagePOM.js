var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApplicationManager } from "../ApplicationManager.js";
import { User } from "../domain/User.js";
import { AbstractPOM } from "./AbstractPOM.js";
import { ImpressumNoLoginPagePOM } from "./ImpressumNoLoginPagePOM.js";
export class LandingPagePOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield AbstractPOM.showPage('./html/landingPage.html');
            const appManager = ApplicationManager.getInstance();
            const pageContent = document.getElementById("PageContent");
            const loginForm = document.getElementById("FormLogin");
            const signupForm = document.getElementById("FormSignup");
            const linkShowSignupDialog = document.getElementById('LinkShowSignupDialog');
            const linkShowLoginDialog = document.getElementById('LinkShowLoginDialog');
            const linkImpressum = document.getElementById('LinkImpressum');
            const buttonSignupUser = document.getElementById('ButtonSignupUser');
            const buttonLoginUser = document.getElementById('ButtonLoginUser');
            // zwischen signup und login wechseln
            linkShowSignupDialog === null || linkShowSignupDialog === void 0 ? void 0 : linkShowSignupDialog.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.reset();
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            });
            linkShowLoginDialog === null || linkShowLoginDialog === void 0 ? void 0 : linkShowLoginDialog.addEventListener('click', (e) => {
                e.preventDefault();
                signupForm.reset();
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
            });
            //impressum (ohne login) zeigen
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (e) => {
                e.preventDefault();
                pageContent.innerHTML = '';
                new ImpressumNoLoginPagePOM().init();
            });
            buttonSignupUser === null || buttonSignupUser === void 0 ? void 0 : buttonSignupUser.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const username = document.getElementById("FormSignupUsername").value.trim();
                const firstname = document.getElementById("FormSignupFirstName").value.trim();
                const lastname = document.getElementById("FormSignupLastName").value.trim();
                const password = document.getElementById("FormSignupPassword").value.trim();
                if (!username || !password) {
                    appManager.showToast("User ID and password cannot be empty.");
                    return;
                }
                const newUser = new User(username, firstname, lastname, password);
                const success = yield appManager.addUser(newUser);
                if (success) {
                    signupForm.reset();
                }
            }));
            buttonLoginUser === null || buttonLoginUser === void 0 ? void 0 : buttonLoginUser.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const username = document.getElementById("FormLoginUsername").value.trim();
                const password = document.getElementById("FormLoginPassword").value.trim();
                if (!username || !password) {
                    appManager.showToast("User ID and password cannot be empty.");
                    return;
                }
                const success = yield appManager.login(username, password);
                if (success) {
                    loginForm.reset();
                    yield appManager.loadStartPage();
                }
            }));
        });
    }
}
