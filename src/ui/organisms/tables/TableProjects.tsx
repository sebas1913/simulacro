"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/ui/atoms";
import { IGetProjectsResponse } from "@/app/core/application/dto/projects/projects-response.dto";
import styles from './table.module.scss';
import Table from "@/ui/molecules/table/Table";
import Button from "@/ui/atoms/button/Button";
import PaginationProjects from "../pagination/ProjectsPagination";


interface TableProjectsProps{
    dataResponse: IGetProjectsResponse;
    onEdit: (id: number) => void;
}


const TableProjects: React.FC<TableProjectsProps> = ({dataResponse, onEdit}) => {
    const router = useRouter();
    const { data } = dataResponse;

    const handleDelete = async (id: number) => {
        const isConfirm = confirm('¿Estás seguro de que deseas eliminar este proyecto?');
        if (!isConfirm) return;

        try {
            await fetch(`/api/projects/delete/${id}`, {
                method: 'DELETE'
            });
            console.log('Eliminado');
            router.refresh();
    
        } catch (error) {
            console.log('Error', error);
        }

        router.refresh();
        
    }

    const headers = [
        { label: "Título", key: "title" },
        { label: "Descripción", key: "description" },
        { label: "Inicio", key: "startDate" },
        { label: "Fin", key: "endDate" },
        { label: "Estado", key: "isActive" },
        { label: "Organizador", key: "organizer" },
        { label: "Acciones", key: "actions" }
    ];

    const formatedData = data.map((project) => ({
        title: project.title,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        isActive: project.isActive ? (
            <span className={styles.active}>Activo</span>
        ) : (
            <span className={styles.inactive}>Inactivo</span>
        ),
        organizer: project.organizer.name,
        actions: (
            <div className={styles.actions}>
                <Button className="secondary-border" onClick={() => onEdit(project.id)}>Editar</Button>
                <Button className="delete" onClick={() => handleDelete(project.id)}>Eliminar</Button>
            </div>
        ),
        
    }));

    return(
        <div>
            <Table headers={headers} data={formatedData}></Table>
            <PaginationProjects data={dataResponse}></PaginationProjects>
        </div>
    )


}


export default TableProjects;




