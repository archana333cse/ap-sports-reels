import { generateScript } from '../lib/generateScript';
import { fetchImage } from '../lib/fetchImage';
import { generateVoice } from '../lib/generateVoice';
import { generateVideo } from '../lib/generateVideo';
import { uploadToS3 } from '../lib/uploadToS3';
import fs from 'fs';

(async () => {
  const celebrity = 'Serena Williams';
  const script = await generateScript(celebrity);
  const imageUrl = await fetchImage(celebrity);

  const imagePath = 'temp.jpg';
  const audioPath = 'temp.mp3';
  const videoPath = 'output.mp4';

  const imageBuffer = await fetch(imageUrl).then(r => r.arrayBuffer());
  fs.writeFileSync(imagePath, Buffer.from(imageBuffer));

  await generateVoice(script, audioPath);
  await generateVideo(imagePath, audioPath, videoPath);
  const url = await uploadToS3(videoPath, `${celebrity.replace(/ /g, '-')}.mp4`);

  console.log('Uploaded:', url);
})();
