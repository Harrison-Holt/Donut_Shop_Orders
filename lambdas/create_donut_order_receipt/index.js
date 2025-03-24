import { PDFDocument } from "pdf-lib";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export const handler = async(event) => {
    console.log(event); 

    const order_id = event.Payload.body.order_id;
    const donut_type = event.Payload.body.donut_type
    const quantity = event.Payload.body.quantity; 
    

}