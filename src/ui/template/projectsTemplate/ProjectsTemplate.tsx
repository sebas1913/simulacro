"use client";
import { useState } from "react";
import { IGetProjectsResponse } from "@/app/core/application/dto/projects/projects-response.dto";
import TableProjects from "@/ui/organisms/tables/TableProjects";
import styles from './template.module.scss';
import Modal from "@/ui/organisms/modal/Modal";
import ProjectForm from "@/ui/organisms/projectsForm/ProjectsForm";

interface IProps {
    dataResponse: IGetProjectsResponse;
}


const ProjectsPageTemplate: React.FC<IProps> = ({ dataResponse }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectID, setProjectID] = useState<number>();


    const closeModal = () => {
        setIsModalOpen(false);
        setProjectID(undefined);
    };

    const handleEdit = (id : number) => {
        setIsModalOpen(true);
        setProjectID(id);
    };


    return (
        <div className={styles.container}>
            <TableProjects dataResponse={dataResponse} onEdit={handleEdit}></TableProjects>

            <Modal isVisible={isModalOpen} onClose={closeModal}>
                <ProjectForm closeModal={closeModal} projectID={projectID}/>
            </Modal>
        </div>
    )
}

export default ProjectsPageTemplate;