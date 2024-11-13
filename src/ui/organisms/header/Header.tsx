import styles from './header.module.scss';
import Title from "@/ui/atoms/Title";
import Button from "@/ui/atoms/button/Button";
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div>
                <Link href={'/'} className={styles.link}>
                    <Title className={styles.title} level={1}>VolunteerConnect</Title>
                </Link>
            </div>
            <div>
                <Link href={'/login'} className={styles.link}>
                    <Button>
                        Iniciar sesión
                    </Button>
                </Link>

                <Link href={'/register'} className={styles.link}>
                    <Button className="primary">Registrarse</Button>
                </Link>
            </div>
        </header>
    )
}

export default Header;
