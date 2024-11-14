"use client";
import { IGetProjectsResponse } from "@/app/core/application/dto/projects/projects-response.dto";
import TableProjects from "@/ui/organisms/tables/TableProjects";

interface IProps {
    dataResponse: IGetProjectsResponse;
}

const handleEdit = (id: number) => {
    console.log(id, 'Hola');
    
}

const ProjectsPageTemplate: React.FC<IProps> = ({dataResponse}) => {
    return(
        <TableProjects dataResponse={dataResponse} onEdit={handleEdit}></TableProjects>
    )
}

export default ProjectsPageTemplate;