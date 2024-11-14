"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { IGetProjectsResponse } from "@/app/core/application/dto/projects/projects-response.dto";
import { Icons } from "@/ui/atoms";
import Button from "@/ui/atoms/button/Button";
import styles from './pagination.module.scss';

interface IProps{
    data: IGetProjectsResponse;
}

function PaginationProjects({data}: IProps){
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = data.metadata.currentPage;
    const totalPages = data.metadata.totalPages;

    const onPageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={styles.paginationContainer}>
            <div>
                <Button className={styles.button} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    {Icons.paginationPrevious}
                </Button>
            </div>

            <span className={styles.strong}>{currentPage} de {totalPages}</span>

            <div>
                <Button className={styles.button} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    {Icons.paginationNext}
                </Button>
            </div>

        </div>
    );
}

export default PaginationProjects;








