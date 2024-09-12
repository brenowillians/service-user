export class sendMailWithCredentialsDTO {
    message:string;
    subject: string;
    from: string;
    to: string;
    host: string;
    port: string;
    user: string;
    password: string;
    cc?: string;
    bcc?: string; 
    attachment?: Attachment[];
    signature?: string;

}

export class Attachment {
    filename: string;
    path: string;
}