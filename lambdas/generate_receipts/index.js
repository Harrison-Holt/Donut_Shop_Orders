import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: 'us-east-1' }); 

export const handler = async(event) => {

    console.log(event); 

    const { order_id, donut_type, quantity, customerName, customerEmail, timestamp } = event; 

    if (!order_id || !donut_type || !quantity || !customerName || !customerEmail || !timestamp) {
        return {
            statusCode: 400, 
            body: JSON.stringify({ message: 'Invalid Event!' })
        }
    } 

    const order_date = new Date(timestamp).toLocaleString("en-US", {
        timeZone: "America/New-York"
    }); 

     // Generate PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([500, 400]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText("🍩 Dough & Behold – Order Receipt", {
    x: 50,
    y: 350,
    size: 18,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText(`Order ID: ${order_id}`, { x: 50, y: 310, font, size: 12 });
  page.drawText(`Customer: ${customerName}`, { x: 50, y: 290, font, size: 12 });
  page.drawText(`Email: ${customerEmail}`, { x: 50, y: 270, font, size: 12 });
  page.drawText(`Order Date: ${order_date}`, { x: 50, y: 250, font, size: 12 });
  page.drawText(`Donut: ${donut_type}`, { x: 50, y: 230, font, size: 12 });
  page.drawText(`Quantity: ${quantity}`, { x: 50, y: 210, font, size: 12 });
  page.drawText(`Total: $${(quantity >= 12 ? quantity * 1 : quantity * 1.5).toFixed(2)}`, {
    x: 50,
    y: 190,
    font,
    size: 12,
  });

  const pdfBytes = await pdfDoc.save();

  const fileKey = `receipts/${order_id}.pdf`;

  await s3.send(
    new PutObjectCommand({
      Bucket: "donut-order-receipt",
      Key: fileKey,
      Body: Buffer.from(pdfBytes),
      ContentType: "application/pdf",
    })
  );

  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: "donut-order-receipt",
      Key: fileKey,
    }),
    { expiresIn: 3600 } // 1 hour
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ receiptUrl: url }),
  };
}
