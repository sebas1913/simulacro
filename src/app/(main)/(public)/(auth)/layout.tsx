import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Link className={styles.link} href={'/'}>Volver al inicio</Link>
            <div>{children}</div>
        </div>
    )
}
