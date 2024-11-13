"use client";
import AuthGuard from "./guard/authGuard";
import Navbar from "@/ui/organisms/navbar/Navbar";
import Sidebar from "@/ui/organisms/sidebar/Sidebar";


export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthGuard>
                <Sidebar />
                <Navbar />
                {children}
            </AuthGuard>
        </>
    )
}