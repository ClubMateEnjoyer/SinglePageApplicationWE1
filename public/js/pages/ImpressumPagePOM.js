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
import { StartPagePOM } from "./StartPagePOM.js";
import { UserManagementPagePOM } from "./UserManagementPagePOM.js";
export class ImpressumPagePOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield AbstractPOM.showPage('./html/impressumPage.html');
            const appManager = ApplicationManager.getInstance();
            const linkRoot = document.getElementById('LinkRoot');
            const linkImpressum = document.getElementById('LinkImpressum');
            const linkLogout = document.getElementById('LinkLogout');
            const linkUserManagemant = document.getElementById('LinkUserManagement');
            // startseite (für eingeloggte user)
            linkRoot === null || linkRoot === void 0 ? void 0 : linkRoot.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield new StartPagePOM().init();
            }));
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield this.init();
            }));
            // logout Link
            linkLogout === null || linkLogout === void 0 ? void 0 : linkLogout.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                appManager.logout();
                yield appManager.loadLandingPage();
            }));
            // Link zur User Management Seite
            linkUserManagemant === null || linkUserManagemant === void 0 ? void 0 : linkUserManagemant.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                yield new UserManagementPagePOM().init();
            }));
        });
    }
}
