import AWS from 'aws-sdk';
import fs from 'fs';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export async function uploadToS3(filePath: string, key: string) {
  const file = fs.readFileSync(filePath);
  await s3.upload({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    Body: file,
    ContentType: 'video/mp4'
  }).promise();

  return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
