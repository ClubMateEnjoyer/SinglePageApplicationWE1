var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AbstractPOM {
    static showPage(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageContent = document.getElementById("PageContent");
            try {
                const response = yield fetch(path);
                if (!response.ok) {
                    throw new Error(`Error, Status: ${response.status}`);
                }
                const container = yield response.text();
                if (pageContent) {
                    pageContent.innerHTML = '';
                    pageContent.innerHTML = container;
                }
                else {
                    console.error("Having trouble finding 'PageContent'.");
                }
            }
            catch (error) {
                console.error("Having trouble showing " + path + " Error: " + error);
            }
        });
    }
}
