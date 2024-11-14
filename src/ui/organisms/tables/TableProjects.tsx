"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/ui/atoms";
import { IGetProjectsResponse } from "@/app/core/application/dto/projects/projects-response.dto";
import styles from './table.module.scss';
import Table from "@/ui/molecules/table/Table";
import Button from "@/ui/atoms/button/Button";


interface TableProjectsProps{
    dataResponse: IGetProjectsResponse;
    onEdit: (id: number) => void;
}


const TableProjects: React.FC<TableProjectsProps> = ({dataResponse, onEdit}) => {
    const router = useRouter();
    const { data } = dataResponse;

    const handleDelete = (id: number) => {
        console.log('Eliminado');
        
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
        isActive: project.isActive,
        organizer: project.organizer.name,
        actions: (
            <div className={styles.actions}>
                <Button onClick={() => onEdit(project.id)}>{Icons.edit}</Button>
                <Button onClick={() => handleDelete(project.id)}>{Icons.delete}</Button>
            </div>
        ),
        
    }));

    return(
        <div>
            <Table headers={headers} data={formatedData}></Table>
        </div>
    )


}


export default TableProjects;




