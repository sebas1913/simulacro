import { useSession } from 'next-auth/react';
import styles from './navbar.module.scss';
import Title from '@/ui/atoms/Title';
import Button from '@/ui/atoms/button/Button';
import { Icons } from '@/ui/atoms';
import Paragraph from '@/ui/atoms/Paragraph';
import { CustomSession } from '@/app/api/auth/[...nextauth]/route';

const Navbar: React.FC = () => {
    const { data: session  } = useSession();
    const sessionUser = session as CustomSession;

    return (
        <nav className={styles.nav}>
            <div className={styles.items}>
                <Title level={1} className={styles.title}>Dashboard de proyectos</Title>
            </div>

            <div className={styles.items}>
                <Button className="primary-icons">{Icons.download} Descargar reporte</Button>
                <Button className='primary-icons'>{Icons.add} Nuevo proyecto</Button>
                <div className={styles.infoUser}>
                    <img
                        className={styles.image}
                        src={sessionUser?.user.photo!}
                        alt="Foto de usuario"
                    />
                    <Paragraph>{session?.user?.name}</Paragraph>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;