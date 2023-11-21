export interface LoginRequest {
    cedula: string,
    nombreCompleto: string,
    fechaNac?: Date,
    email:string,
    password:string
}