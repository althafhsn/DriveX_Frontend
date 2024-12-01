export class ResetPassword {
    public email!: string;
    public emailToken!: string;
    public oldPassword!: string;
    public newPassword!: string;
    public confirmPassword!: string;
}

export class ResetPasswordMail {
    public email!: string;
}