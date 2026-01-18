import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "./store";
import { login, registerUser, type LoginDTO, type RegisterDTO } from "./api";

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: LoginDTO) => login(data),
        onSuccess: (data) => {
            setAuth(data.token, data.user);
            navigate({ to: "/" });
        },
    });
};

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterDTO) => registerUser(data),
        onSuccess: () => {
            navigate({ to: "/auth/login" }); // Было /login
        },
    });
};
