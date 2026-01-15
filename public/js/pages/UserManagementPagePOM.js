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
import { ApplicationManager } from "../ApplicationManager.js";
import { User } from "../domain/User.js";
import { ImpressumPagePOM } from "./ImpressumPagePOM.js";
export class UserManagementPagePOM {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield AbstractPOM.showPage("./html/userManagementPage.html");
            const appManager = ApplicationManager.getInstance();
            const linkRoot = document.getElementById('LinkRoot');
            const linkImpressum = document.getElementById('LinkImpressum');
            const linkLogout = document.getElementById('LinkLogout');
            const tableUsersBody = document.getElementById('TableUsersBody');
            const addUserForm = document.getElementById("FormAddUser");
            const buttonAddUser = document.getElementById("FormAddUserSubmit");
            const buttonCancel = document.getElementById("FormAddUserCancel");
            const users = yield appManager.getUsers();
            linkRoot === null || linkRoot === void 0 ? void 0 : linkRoot.addEventListener("click", e => {
                e.preventDefault();
                appManager.loadStartPage();
            });
            linkImpressum === null || linkImpressum === void 0 ? void 0 : linkImpressum.addEventListener('click', (event) => {
                event.preventDefault();
                new ImpressumPagePOM().init();
            });
            linkLogout === null || linkLogout === void 0 ? void 0 : linkLogout.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                appManager.logout();
                appManager.loadLandingPage();
            }));
            buttonCancel === null || buttonCancel === void 0 ? void 0 : buttonCancel.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                addUserForm.reset();
            }));
            buttonAddUser === null || buttonAddUser === void 0 ? void 0 : buttonAddUser.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                console.log("button clicked");
                const username = document.getElementById("FormAddUserUsername").value.trim();
                const firstname = document.getElementById("FormAddUserFirstName").value.trim();
                const lastname = document.getElementById("FormAddUserLastName").value.trim();
                const password = document.getElementById("FormAddUserPassword").value.trim();
                if (!username || !password) {
                    appManager.showToast("User ID and password cannot be empty.");
                    return;
                }
                const newUser = new User(username, firstname, lastname, password);
                const success = yield appManager.addUser(newUser);
                if (success) {
                    addUserForm.reset();
                    // https://getbootstrap.com/docs/5.3/components/modal/#via-javascript
                    // https://getbootstrap.com/docs/4.0/components/modal/
                    // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
                    // bootstrap verwendet globale objekte über window.bootstrap
                    // typescript kennt die nicht, daher Zugriff über <any> cast
                    const bootstrap = window.bootstrap;
                    const modalElement = document.getElementById("addUserModal");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                    modalInstance.hide();
                    this.init();
                }
            }));
            const buttonEditSubmit = document.getElementById("FormEditUserSubmit");
            buttonEditSubmit === null || buttonEditSubmit === void 0 ? void 0 : buttonEditSubmit.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                const userID = document.getElementById("FormEditUserUsername").value;
                const firstName = document.getElementById("FormEditUserFirstName").value.trim();
                const lastName = document.getElementById("FormEditUserLastName").value.trim();
                const password = document.getElementById("FormEditUserPassword").value.trim();
                const updatedUser = new User(userID, firstName, lastName, password);
                const success = yield appManager.updateUser(updatedUser);
                if (success) {
                    const bootstrap = window.bootstrap;
                    const modalElement = document.getElementById("editUserModal");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance === null || modalInstance === void 0 ? void 0 : modalInstance.hide();
                    this.init();
                }
            }));
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
                deleteBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                    const success = yield appManager.removeUser(user.userID);
                    if (success) {
                        this.init();
                    }
                }));
                editBtn.addEventListener("click", () => {
                    // Modal-Felder befüllen
                    document.getElementById("FormEditUserUsername").value = user.userID;
                    document.getElementById("FormEditUserFirstName").value = user.firstName;
                    document.getElementById("FormEditUserLastName").value = user.lastName;
                    document.getElementById("FormEditUserPassword").value = user.password;
                    // Modal anzeigen
                    const bootstrap = window.bootstrap;
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
        });
    }
}
