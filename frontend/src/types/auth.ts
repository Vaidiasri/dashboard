export interface LoginValue {
    username: string;
    password: string;
}

export interface RegisterValue {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    age: number | null;
    gender: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}
