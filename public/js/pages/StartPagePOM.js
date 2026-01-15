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
import { AbstractPOM } from "./AbstractPOM.js";
import { ImpressumPagePOM } from "./ImpressumPagePOM.js";
import { UserManagementPagePOM } from "./UserManagementPagePOM.js";
export class StartPagePOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const appManager = ApplicationManager.getInstance();
            yield AbstractPOM.showPage('./html/startingPage.html');
            const userCount = document.getElementById('UserCount');
            const linkLogout = document.getElementById('LinkLogout');
            const linkImpressum = document.getElementById('LinkImpressum');
            const linkUserManagemant = document.getElementById('LinkUserManagement');
            const startLinkUsrMgmt = document.getElementById('StartPageLinkUserManagement');
            userCount.innerHTML = appManager.getUserCount().toString();
            const currentUser = appManager.getLoggedInUser();
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (e) => {
                e.preventDefault();
                new ImpressumPagePOM().init();
            });
            linkUserManagemant === null || linkUserManagemant === void 0 ? void 0 : linkUserManagemant.addEventListener('click', (e) => {
                e.preventDefault();
                new UserManagementPagePOM().init();
            });
            startLinkUsrMgmt === null || startLinkUsrMgmt === void 0 ? void 0 : startLinkUsrMgmt.addEventListener('click', (e) => {
                e.preventDefault();
                new UserManagementPagePOM().init();
            });
            linkLogout === null || linkLogout === void 0 ? void 0 : linkLogout.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                appManager.logout();
                appManager.loadLandingPage();
            }));
            const count = yield appManager.getUserCount();
            userCount.textContent = count.toString();
            const welcomeText = document.getElementById("StartPageWelcomeText");
            if (welcomeText && currentUser) {
                let name;
                if (currentUser.firstName && currentUser.lastName) {
                    name = currentUser.firstName + " " + currentUser.lastName;
                }
                else {
                    name = currentUser.userID;
                }
                welcomeText.textContent = "Willkommen, " + name + "!";
            }
        });
    }
}
