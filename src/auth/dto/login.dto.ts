export class LoginDto {

    accessToken: string
    refreshToken: string
    userDTO: {
        id: number,
        email: string,
        username: string
    }
}
