export interface LoginValue {
    username: string;
    password: string;
}

export interface RegisterValue {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    age: number | string;
    gender: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface AuthInputProps {
    name: string;
    type?: string;
    placeholder: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any; 
    icon: React.ElementType; // Heroicon component
}
