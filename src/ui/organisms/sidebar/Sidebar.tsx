import { signOut } from "next-auth/react";
import { Icons } from "@/ui/atoms";
import styles from './sidebar.module.scss';
import Button from "@/ui/atoms/button/Button";
import Title from "@/ui/atoms/Title";

const Sidebar: React.FC = () => {
    const handleSignOut = async () => {
        await signOut({
            callbackUrl: '/'
        });
    };

    return (
        <aside className={styles.aside}>
            <div>
                <Title level={1} className={styles.title}>VolunteerConnect</Title>
            </div>
            <div className={styles.containerItems}>
                <div className={styles.item}>
                    <Button className="secondary-icons-big">{Icons.folder} Proyectos</Button>
                </div>
                <div className={styles.item}>
                    <Button className="secondary-icons-big" onClick={handleSignOut}>{Icons.logOut} Cerrar sesión</Button>
                </div>
                
            </div>
        </aside>
    )
}

export default Sidebar;