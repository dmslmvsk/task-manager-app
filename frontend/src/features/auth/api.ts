import { api } from "@/lib/api";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        email: string;
        username: string;
    };
}

export const login = async (data: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post("/login", data);
    return response.data;
};

export const registerUser = async (data: RegisterDTO) => {
    const response = await api.post("/register", data);
    return response.data;
};
