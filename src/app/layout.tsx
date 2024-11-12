import type { Metadata } from "next";
import  '../styles/globals.scss';
import { AuthProvider } from "./auth-provider";
import { Raleway } from "next/font/google";
import Header from "@/ui/organisms/header/Header";


export const metadata: Metadata = {
    title: "Voluntariado y Proyectos Comunitarios",
    description: "Plataforma de Voluntariado y Proyectos Comunitarios",
};

const raleway = Raleway({ subsets: ["latin"], weight: '400' });


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={raleway.className}>
                <Header />
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
