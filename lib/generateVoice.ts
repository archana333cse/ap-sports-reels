import AWS from 'aws-sdk';
import fs from 'fs';

const polly = new AWS.Polly({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export async function generateVoice(text: string, filePath: string) {
  const result = await polly.synthesizeSpeech({
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Matthew',
  }).promise();

  fs.writeFileSync(filePath, result.AudioStream as Buffer);
}
