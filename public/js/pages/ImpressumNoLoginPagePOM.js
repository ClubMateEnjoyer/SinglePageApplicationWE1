var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AbstractPOM } from "./AbstractPOM.js";
import { LandingPagePOM } from "./LandingPagePOM.js";
export class ImpressumNoLoginPagePOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield AbstractPOM.showPage('./html/impressumNoLoginPage.html');
            const linkRoot = document.getElementById('LinkRoot');
            const linkImpressum = document.getElementById('LinkImpressum');
            linkRoot === null || linkRoot === void 0 ? void 0 : linkRoot.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield new LandingPagePOM().init();
            }));
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                yield this.init();
            }));
        });
    }
}
