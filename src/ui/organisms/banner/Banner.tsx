import styles from './banner.module.scss';
import Button from "@/ui/atoms/button/Button";
import Title from "@/ui/atoms/Title";
import Paragraph from '@/ui/atoms/Paragraph';

const Banner: React.FC = () => {
    return(
        <div className={styles.container}>
            <div>
                <Title className={styles.title} level={1}>Conecta, colabora, cambia el mundo</Title>
            </div>
            <div>
                <Paragraph className={styles.paragraph}>Únete a nuestra comunidad de voluntarios y organizadores. Encuentra proyectos que te apasionen o crea los tuyos propios para hacer una diferencia en tu comunidad</Paragraph>
            </div>
            <div className={styles.containerButton}>
                <Button className='primary'>Explorar proyectos</Button>
                <Button className='secondary'>Comenzar como organizador</Button>
            </div>
        </div>
    )
}

export default Banner;