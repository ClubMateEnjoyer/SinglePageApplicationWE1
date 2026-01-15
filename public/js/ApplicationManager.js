var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LandingPagePOM } from "./pages/LandingPagePOM.js";
import { StartPagePOM } from "./pages/StartPagePOM.js";
import { UserManagementPagePOM } from "./pages/UserManagementPagePOM.js";
export class ApplicationManager {
    constructor() {
        this.currentUser = null;
    }
    static getInstance() {
        if (!ApplicationManager.instance) {
            ApplicationManager.instance = new ApplicationManager();
        }
        return ApplicationManager.instance;
    }
    loadLandingPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new LandingPagePOM().init();
        });
    }
    loadStartPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const startingPage = new StartPagePOM();
            yield startingPage.init();
        });
    }
    loadUserManagementPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const userManagementPage = new UserManagementPagePOM();
            yield userManagementPage.init();
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('/api/users');
                if (response.ok) {
                    return yield response.json(); // array aus userobjekten
                }
                else {
                    this.showToast("Failed to get users.");
                    return []; // leeres array wenn fehler
                }
            }
            catch (error) {
                this.showToast("Network error getting users.");
                console.error("Get users fetch error:", error);
                return [];
            }
        });
    }
    getUserCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('/api/users/count');
                if (response.ok) {
                    const data = yield response.json();
                    return data.UserCount;
                }
                else {
                    this.showToast("Failed to get user count.");
                    return 0;
                }
            }
            catch (error) {
                this.showToast("Network error getting user count.");
                console.error("Get user count fetch error:", error);
                return 0;
            }
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                if (response.ok) {
                    this.showToast("User registered successfully.");
                    return true;
                }
                else {
                    const errorData = yield response.json();
                    this.showToast(`Registration failed: ${errorData.Error || 'Unknown error'}`);
                    return false;
                }
            }
            catch (error) {
                this.showToast("Network error during registration.");
                console.error("Add user fetch error:", error);
                return false;
            }
        });
    }
    removeUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`/api/users/${userID}`, {
                    method: 'DELETE'
                });
                if (response.status === 204) { // 204 == no content --> for successful delete
                    this.showToast(`User ${userID} deleted successfully.`);
                    return true;
                }
                else if (response.status === 404) {
                    this.showToast(`User ${userID} not found.`);
                    return false;
                }
                else {
                    const errorData = yield response.json();
                    this.showToast(`Deletion failed: ${errorData.message || 'Unknown error'}`);
                    return false;
                }
            }
            catch (error) {
                this.showToast("Network error during user deletion.");
                console.error("Remove user fetch error:", error);
                return false;
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`/api/users/${user.userID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                if (response.ok) {
                    this.showToast("User updated successfully.");
                    return true;
                }
                else {
                    const errorData = yield response.json();
                    this.showToast(`Update failed: ${errorData.Error || 'Unknown error'}`);
                    return false;
                }
            }
            catch (error) {
                this.showToast("Network error during user update.");
                console.error("Update user fetch error:", error);
                return false;
            }
        });
    }
    login(userID, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('/api/login', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + btoa(userID + ":" + password)
                    }
                });
                if (response.ok) {
                    this.currentUser = yield response.json();
                    this.showToast("Login successful.");
                    return true;
                }
                else {
                    const errorData = yield response.json();
                    this.showToast(`Login failed: ${errorData.Error || 'Unknown error'}`);
                    this.currentUser = null;
                    return false;
                }
            }
            catch (error) {
                this.showToast("Network error during login.");
                this.currentUser = null;
                console.error("Login fetch error:", error);
                return false;
            }
        });
    }
    getLoggedInUser() {
        return this.currentUser;
    }
    isLoggedIn() {
        return this.currentUser != null;
    }
    logout() {
        this.currentUser = null;
    }
    // styling mithile von ChatGPT generiert
    showToast(message) {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#333";
        toast.style.color = "white";
        toast.style.padding = "10px 20px";
        toast.style.borderRadius = "5px";
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ApplicationManager initialisiert.");
            this.loadLandingPage();
        });
    }
}
