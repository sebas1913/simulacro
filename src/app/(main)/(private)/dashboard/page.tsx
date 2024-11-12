import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }

    

    return (
        <div>
        </div>
    )
}
