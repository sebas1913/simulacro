import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/app/api/auth/[...nextauth]/route';
import { Icons } from '@/ui/atoms';
import styles from './navbar.module.scss';
import Title from '@/ui/atoms/Title';
import Button from '@/ui/atoms/button/Button';
import Paragraph from '@/ui/atoms/Paragraph';
import ButtonCreate from '@/ui/molecules/buttonCreate/ButtonCreate';
import Modal from '../modal/Modal';
import ProjectForm from '../projectsForm/ProjectsForm';

const Navbar: React.FC = () => {
    const { data: session } = useSession();
    const sessionUser = session as CustomSession;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectID, setProjectID] = useState<number>();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProjectID(undefined);
    };

    const downloadReport = async () => {
        try {
            const response = await fetch('/api/projects/download');

            if (!response.ok) {
                throw new Error('No se pudo descargar el archivo');
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte-proyecto.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.items}>
                <Title level={1} className={styles.title}>Dashboard de proyectos</Title>
            </div>

            <div className={styles.items}>
                <Button className="primary-icons" onClick={downloadReport}>
                    {Icons.download} Descargar reporte
                </Button>

                <ButtonCreate onClick={openModal} text="Nuevo proyecto" />
                
                <div className={styles.infoUser}>
                    <img
                        className={styles.image}
                        src={sessionUser?.user.photo!}
                        alt="Foto de usuario"
                    />
                    <Paragraph>{session?.user?.name}</Paragraph>
                </div>
            </div>

            <Modal isVisible={isModalOpen} onClose={closeModal}>
                <ProjectForm closeModal={closeModal} projectID={projectID} />
            </Modal>
        </nav>
    );
};

export default Navbar;
