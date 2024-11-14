import { HttpClient } from "@/app/infrastructure/utils/httpClient";
import { IGetProjectsResponse } from "@/app/core/application/dto/projects/projects-response.dto";
import { IProjectRequest } from "@/app/core/application/dto/projects/projects-request.dto";


export class ProjectService{
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async find(page: number, size: number): Promise<IGetProjectsResponse> {
        try {
            const response = await this.httpClient.get<IGetProjectsResponse>(`projects?page=${page}&size=${size}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(body: IProjectRequest) {
        try {
            const response = this.httpClient.post<IGetProjectsResponse, IProjectRequest>('clients', body);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


}