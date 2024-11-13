import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILoginResponse } from "@/app/core/application/dto/auth/login-response.dto";

interface AuthToken {
    id?: number;
    token?: string;
    name?: string;
    photo?: string;
    role?: string;
}

interface AuthUser {
    id: number;
    token: string;
    name: string;
    email: string;
    role: string;
    photo: string;
}

export interface CustomSession extends Session {
    user: {
        id?: number;
        token?: string | null;
        name?: string | null;
        email?: string | null;
        role?: string | null;
        photo?: string | null;
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo Electrónico", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials.email) {
                    console.log('Credenciales nulas');
                    return null;
                }

                const loginRequest: ILoginRequest = {
                    email: credentials.email,
                    password: credentials.password,
                };

                try {
                    const authService = new AuthService();
                    const response: ILoginResponse = await authService.login(loginRequest);

                    return {
                        id: response.data.user.sub,
                        token: response.data.access_token,
                        name: response.data.user.email,
                        email: response.data.user.email,
                        role: response.data.user.role,
                        photo: response.data.user.photo,
                    } as AuthUser;

                    

                } catch (error) {
                    console.log(error);
                    return Promise.reject(new Error(JSON.stringify(error)));
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.token = authUser.token;
                token.name = authUser.name;
                token.photo = authUser.photo;
                token.role = authUser.role;
            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            customSession.user.token = (token as AuthToken).token;
            customSession.user.name = (token as AuthToken).name;
            customSession.user.role = (token as AuthToken).role;
            customSession.user.photo = (token as AuthToken).photo;

            customSession.user.photo = customSession.user.photo;
            return customSession;
        },
    },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
