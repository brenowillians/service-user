import  *  as nodemailer from 'nodemailer'
import { Inject, Injectable} from '@nestjs/common';
import { sendMailDTO } from '../dto/send-mail.dto';
import { sendMailWithCredentialsDTO } from '../dto/send-mail-with-credentials.dto';

@Injectable()
export class MailService {
  constructor(
  ) {}

    async sendMail(data: sendMailDTO) {
      
        try{
          let recipients = data.to.split(';')
          let recipientsCc = data.cc ?data.cc.split(';') : undefined
          let recipientsBcc = data.bcc? data.bcc.split(';') : undefined

          let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
            tls: { rejectUnauthorized: false, ciphers: 'SSLv3' },
            secure: false,
          });

          let html =data.message
          if (data.signature){
            html+= "<br>" + data.signature
          }

          if(data.attachment && data.attachment.length){
            await transporter.sendMail({
              from: data.from,
              to: recipients,
              cc: recipientsCc,
              bcc: recipientsBcc,
              subject: data.subject,
              html: html,
              attachments: data.attachment
            })
          }
          else{
            await transporter.sendMail({
              from: data.from,
              to: recipients,
              cc: recipientsCc,
              bcc: recipientsBcc,
              subject: data.subject,
              html: html,
            })
          }
          
          return {
              status: 200,
              message:'E-mail Sent Correctly',
              error: null
          }
        }
        catch(error){        
          return {
              status: 400,
              message:error.message,
              error: error.stack
          }           
        }    
        
    }  


  async sendMailWithCredentials(data: sendMailWithCredentialsDTO) {
      
    try{
      let recipients = data.to.split(';')
      let recipientsCc = data.cc ?data.cc.split(';') : undefined
      let recipientsBcc = data.bcc? data.bcc.split(';') : undefined

      let transporter = nodemailer.createTransport({
        host: data.host,
        port: data.port ? Number(data.port) : 587,
        auth: {
          user: data.user,
          pass: data.password,
        },
        tls: { rejectUnauthorized: false, ciphers: 'SSLv3' },
        secure: false,
      });

      let html =data.message
      if (data.signature){
        html+= "<br>" + data.signature
      }

      if(data.attachment && data.attachment.length){
        await transporter.sendMail({
          from: data.from,
          to: recipients,
          cc: recipientsCc,
          bcc: recipientsBcc,
          subject: data.subject,
          html: html,
          attachments: data.attachment
        })
      }
      else{
        await transporter.sendMail({
          from: data.from,
          to: recipients,
          cc: recipientsCc,
          bcc: recipientsBcc,
          subject: data.subject,
          html: html,
        })
      }
      
      return {
          status: 200,
          message:'E-mail Sent Correctly',
          error: null
      }
    }
    catch(error){          
      return {
          status: 400,
          message:error.message,
          error: error.stack
      }           
    }    
  }

}