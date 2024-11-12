"use client";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { ErrorResponse, FieldError } from "@/app/core/application/dto/common/error-response.dto";
import { FormField } from "@/ui/molecules/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import styles from "./form.module.scss"
import Button from "@/ui/atoms/button/Button";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('El correo es inválido')
        .required('Campo obligatorio'),
    password: yup
        .string()
        // .min(8, 'La contraseña debe tener mínimo 8 caracteres')
        .required('La contraseña es obligatoria')
});

const LoginForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema)
    });

    const router = useRouter();

    const handleLogin = async (data: ILoginRequest) => {
        console.log(data);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password
            });

            console.log(result);

            if (result?.error) {
                console.log('Ocurrió un error', JSON.parse(result.error));
                return;
            }

            router.push('/dashboard')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.containerForm}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <FormField<ILoginRequest>
                    control={control}
                    type="email"
                    label="Correo electrónico"
                    name="email"
                    error={errors.email}
                    placeholder="Ingresa tu correo electrónico"
                />

                <FormField<ILoginRequest>
                    control={control}
                    type="password"
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    placeholder="Ingresa tu contraseña"
                />

                <Button className="primary" type="submit">Iniciar sesión</Button>

            </form>
        </div>
    )
}

export default LoginForm;