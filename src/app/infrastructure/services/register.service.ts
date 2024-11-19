import { HttpClient } from "../utils/httpClient";
import { IRegisterResponse } from "@/app/core/application/dto/register/register-response.dto";

export class RegisterService {

    private httpClient : HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    };

    async create( body : FormData) {

        try {
            const data = this.httpClient.register<IRegisterResponse, FormData>('users', body);
            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    };    
};