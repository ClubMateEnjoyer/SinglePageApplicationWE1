import { User } from "./domain/User.js";
import { LandingPagePOM } from "./pages/LandingPagePOM.js";
import { StartPagePOM } from "./pages/StartPagePOM.js";
import { UserManagementPagePOM } from "./pages/UserManagementPagePOM.js";


export class ApplicationManager {
    private static instance: ApplicationManager;
    public static getInstance(): ApplicationManager {
        if(!ApplicationManager.instance) {
            ApplicationManager.instance = new ApplicationManager();
        }
        return ApplicationManager.instance;
    }
    
    private currentUser: User | null = null;
    public async loadLandingPage(): Promise<void> {
        await new LandingPagePOM().init();
    }
    
    async loadStartPage() {
        const startingPage = new StartPagePOM();
        await startingPage.init();
    }
    
    async loadUserManagementPage() {
        const userManagementPage = new UserManagementPagePOM();
        await userManagementPage.init();
    }
    
    public async getUsers(): Promise<User[]> {
        try {
            const response = await fetch('/api/users');
            if (response.ok) {
                return await response.json(); // array aus userobjekten
            } else {
                this.showToast("Failed to get users.");
                return []; // leeres array wenn fehler
            }
        } catch (error) {
            this.showToast("Network error getting users.");
            console.error("Get users fetch error:", error);
            return [];
        }
    }
    public async getUserCount(): Promise<number> {
        try {
            const response = await fetch('/api/users/count');
            if (response.ok) {
                const data = await response.json();
                return data.UserCount;
            } else {
                this.showToast("Failed to get user count.");
                return 0;
            }
        } catch (error) {
            this.showToast("Network error getting user count.");
            console.error("Get user count fetch error:", error);
            return 0;
        }
    }
    public async addUser(user: User): Promise<boolean> {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                this.showToast("User registered successfully.");
                return true;
            } else {
                const errorData = await response.json();
                this.showToast(`Registration failed: ${errorData.Error || 'Unknown error'}`);
                return false;
            }
        } catch (error) {
            this.showToast("Network error during registration.");
            console.error("Add user fetch error:", error);
            return false;
        }
    }
    public async removeUser(userID: string): Promise<boolean> {
        try {
            const response = await fetch(`/api/users/${userID}`, {
                method: 'DELETE'
            });
            if (response.status === 204) { // 204 == no content --> for successful delete
                this.showToast(`User ${userID} deleted successfully.`);
                return true;
            } else if (response.status === 404) {
                this.showToast(`User ${userID} not found.`);
                return false;
            } else {
                const errorData = await response.json();
                this.showToast(`Deletion failed: ${errorData.message || 'Unknown error'}`);
                return false;
            }
        } catch (error) {
            this.showToast("Network error during user deletion.");
            console.error("Remove user fetch error:", error);
            return false;
        }
    }

    public async updateUser(user: User): Promise<boolean> {
        try {
            const response = await fetch(`/api/users/${user.userID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                this.showToast("User updated successfully.");
                return true;
            } else {
                const errorData = await response.json();
                this.showToast(`Update failed: ${errorData.Error || 'Unknown error'}`);
                return false;
            }
        } catch (error) {
            this.showToast("Network error during user update.");
            console.error("Update user fetch error:", error);
            return false;
        }
    }

    
    public async login(userID: string, password: string): Promise<boolean> {
        try {
            const response = await fetch('/api/login', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa(userID + ":" + password)
                }
            });
            if (response.ok) {
                this.currentUser = await response.json();
                this.showToast("Login successful.");
                return true;
            } else {
                const errorData = await response.json();
                this.showToast(`Login failed: ${errorData.Error || 'Unknown error'}`);
                this.currentUser = null;
                return false;
            }
        }catch (error) {
            this.showToast("Network error during login.");
            this.currentUser = null;
            console.error("Login fetch error:", error);
            return false;
        }
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
    showToast(message: string) {
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
    
    public async init(): Promise<void> {
        console.log("ApplicationManager initialisiert.");
        this.loadLandingPage();
    }
}