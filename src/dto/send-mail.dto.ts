export class sendMailDTO {
    message:string;
    subject: string;
    from: string;
    to: string;
    cc?: string;
    bcc?: string; 
    attachment?: Attachment[]
    signature?: string
}

export class Attachment {
    filename: string;
    path: string;
}