import { LoginPage } from "../pages/LoginPage";
import { ENV } from "../config/env";

export class LoginService {

    constructor(private loginPage:LoginPage){}

    async login(){

        await this.loginPage.login(
            ENV.EMAIL,
            ENV.PASSWORD
        );

    }

}