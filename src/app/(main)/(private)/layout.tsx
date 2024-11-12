"use client";
import { signOut } from "next-auth/react";
import Button from "@/ui/atoms/button/Button";
import AuthGuard from "./guard/authGuard";


export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const handleSignOut = async () => {
        await signOut({
            callbackUrl: '/'
        });
    };

    return (
        <>
            {/* <Navbar> */}
                <Button onClick={handleSignOut}>Cerrar sesión</Button>
            {/* </Navbar> */}
            <AuthGuard>{children}</AuthGuard>
        </>
    )
}