import { AbstractPOM } from "./AbstractPOM.js";
import { ApplicationManager } from "../ApplicationManager.js";
import { User } from "../domain/User.js";
import { ImpressumPagePOM } from "./ImpressumPagePOM.js";

export class UserManagementPagePOM {
    public async init(): Promise<void> {
        await AbstractPOM.showPage("./html/userManagementPage.html");
        const appManager = ApplicationManager.getInstance();

        const linkRoot = document.getElementById('LinkRoot');
        const linkImpressum = document.getElementById('LinkImpressum');
        const linkLogout = document.getElementById('LinkLogout') as HTMLElement;
        const tableUsersBody = document.getElementById('TableUsersBody') as HTMLTableSectionElement;
        const addUserForm = document.getElementById("FormAddUser") as HTMLFormElement;
        const buttonAddUser = document.getElementById("FormAddUserSubmit");
        const buttonCancel = document.getElementById("FormAddUserCancel");
        const users = await appManager.getUsers();

        linkRoot?.addEventListener("click", e => {
            e.preventDefault();
            appManager.loadStartPage();
        });

        linkImpressum?.addEventListener('click', (event) => {
            event.preventDefault();
            new ImpressumPagePOM().init();
        });

        linkLogout?.addEventListener('click', async (e) => {
            appManager.logout();
            appManager.loadLandingPage();
        });

        buttonCancel?.addEventListener('click', async (e) => {
            addUserForm.reset();
        });

        buttonAddUser?.addEventListener('click', async (e) => { 
            e.preventDefault();
            const username = (document.getElementById("FormAddUserUsername") as HTMLInputElement).value.trim();
            const firstname = (document.getElementById("FormAddUserFirstName") as HTMLInputElement).value.trim();
            const lastname = (document.getElementById("FormAddUserLastName") as HTMLInputElement).value.trim();
            const password = (document.getElementById("FormAddUserPassword") as HTMLInputElement).value.trim();

            if (!username || !password) {
                appManager.showToast("User ID and password cannot be empty.");
                return;
            }

            const newUser = new User(username, firstname, lastname, password);
            const success = await appManager.addUser(newUser);
            if (success) {
                addUserForm.reset();
                // https://getbootstrap.com/docs/5.3/components/modal/#via-javascript
                // https://getbootstrap.com/docs/4.0/components/modal/
                // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
                // bootstrap verwendet globale objekte über window.bootstrap
                // typescript kennt die nicht, daher Zugriff über <any> cast
                const bootstrap = (<any>window).bootstrap;
                const modalElement = document.getElementById("addUserModal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modalInstance.hide();

                this.init();
            }
        });

        const buttonEditSubmit = document.getElementById("FormEditUserSubmit");
        buttonEditSubmit?.addEventListener("click", async () => {
            const userID = (document.getElementById("FormEditUserUsername") as HTMLInputElement).value;
            const firstName = (document.getElementById("FormEditUserFirstName") as HTMLInputElement).value.trim();
            const lastName = (document.getElementById("FormEditUserLastName") as HTMLInputElement).value.trim();
            const password = (document.getElementById("FormEditUserPassword") as HTMLInputElement).value.trim();

            const updatedUser = new User(userID, firstName, lastName, password);
            const success = await appManager.updateUser(updatedUser);
            if (success) {
                const bootstrap = (<any>window).bootstrap;
                const modalElement = document.getElementById("editUserModal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance?.hide();

                this.init(); 
            }
        });



        for (const user of users) {
            const row = document.createElement("tr");

            const tdUsername = document.createElement("td");
            tdUsername.id = `${user.userID}TableItemUsername`;
            tdUsername.textContent = user.userID;

            const tdFirstName = document.createElement("td");
            tdFirstName.id = `${user.userID}TableItemFirstName`;
            tdFirstName.textContent = user.firstName;

            const tdLastName = document.createElement("td");
            tdLastName.id = `${user.userID}TableItemLastName`;
            tdLastName.textContent = user.lastName;

            const tdActions = document.createElement("td");

            const editBtn = document.createElement("button");
            editBtn.id = `${user.userID}TableItemEditButton`;
            editBtn.textContent = "Edit";
            editBtn.className = "btn btn-sm btn-warning me-2";

            const deleteBtn = document.createElement("button");
            deleteBtn.id = `${user.userID}TableItemDeleteButton`;
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "btn btn-sm btn-danger";

            tdActions.appendChild(editBtn);
            tdActions.appendChild(deleteBtn);

            deleteBtn.addEventListener("click", async () => {
                const success = await appManager.removeUser(user.userID);
                if (success) {
                    this.init(); 
                }
            });

            editBtn.addEventListener("click", () => {
                // automtisch aktuelle values nehmen
                (document.getElementById("FormEditUserUsername") as HTMLInputElement).value = user.userID;
                (document.getElementById("FormEditUserFirstName") as HTMLInputElement).value = user.firstName;
                (document.getElementById("FormEditUserLastName") as HTMLInputElement).value = user.lastName;
                (document.getElementById("FormEditUserPassword") as HTMLInputElement).value = user.password;

                // modal öffnen
                const bootstrap = (<any>window).bootstrap;
                const modalElement = document.getElementById("editUserModal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modalInstance.show();
            });


            row.appendChild(tdUsername);
            row.appendChild(tdFirstName);
            row.appendChild(tdLastName);
            row.appendChild(tdActions);

            tableUsersBody.appendChild(row);
        }
    }
}
