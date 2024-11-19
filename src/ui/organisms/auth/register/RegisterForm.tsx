"use client";
import * as yup from "yup";
import { IRegisterRequest } from "@/app/core/application/dto/register/register-request.dto";
import { FormSelectField } from "@/ui/molecules/common/FormFieldSelect";
import { FormFileField } from "@/ui/molecules/common/FormFileField";
import { useForm } from "react-hook-form";
import { FormField } from "@/ui/molecules/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import styles from "./form.module.scss"
import Button from "@/ui/atoms/button/Button";
import Title from "@/ui/atoms/Title";
import Link from "next/link";


const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email('El correo es inválido')
        .required('Campo obligatorio'),
    password: yup
        .string()
        .min(6, 'La contraseña debe tener mínimo 6 caracteres')
        .required('La contraseña es obligatoria'),
    name: yup
        .string()
        .required('Campo obligatorio'),
    role: yup
        .string()
        .required('Campo obligatorio.'),
    photo: yup
        .mixed<File>()
        .nullable()
        .required('La foto es obligatoria')

});

const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IRegisterRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    const router = useRouter();

    const handleRegister = async (data: IRegisterRequest) => {
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("name", data.name);
            formData.append("role", data.role);

            if (data.photo instanceof File) {
                formData.append("photo", data.photo);
            } else {
                console.log("La imagen no es un archivo válido");
            };

            const response = await fetch("/api/register", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Error al registrar el usuario");
            }

            console.log('Usuario registrado exitosamente.');
            router.push("/login");

            return await response.json();
        } catch (error) {
            console.error("Error al registar usuario: ", error);
            throw error;
        };
    };

    return (
        <div className={styles.containerForm}>
            <div className={styles.headerForm}>
                <Title className={styles.title} level={1}>Regístrate</Title>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
                <FormField<IRegisterRequest>
                    control={control}
                    type="email"
                    label="Correo electrónico"
                    name="email"
                    error={errors.email}
                    placeholder="Ingresa tu correo electrónico"
                />

                <FormField<IRegisterRequest>
                    control={control}
                    type="password"
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    placeholder="Ingresa tu contraseña"
                />

                <FormField<IRegisterRequest>
                    control={control}
                    type="text"
                    name="name"
                    label="Nombre:"
                    error={errors.name}
                    placeholder="Ingresa tu nombre"
                />

                <FormSelectField<IRegisterRequest>
                    control={control}
                    options={[
                        { value: "organizer", label: "Organizador" },
                        { value: "user", label: "Usuario" }
                    ]}
                    name="role"
                    label="Rol:"
                    error={errors.role}
                    placeholder="Ingresa tu rol"
                />

                <FormFileField<IRegisterRequest>
                    control={control}
                    name="photo"
                    label="Foto de Perfil:"
                    error={errors.photo}
                />

                <Button className="primary-big" type="submit">Iniciar sesión</Button>

            </form>
            <div className={styles.footerForm}>
                <div>
                    <Link href={'#'} className={styles.link}>¿Olvidaste tu contraseña?</Link>
                </div>
                <div>
                    ¿Ya tienes cuenta?
                    <Link href={'/login'} className={styles.link}>Inicia sesión aquí</Link>
                </div>
            </div>
        </div>

    )
}

export default RegisterForm;