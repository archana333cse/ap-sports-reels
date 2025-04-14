import { exec } from 'child_process';

export function generateVideo(imagePath: string, audioPath: string, outputPath: string) {
  const cmd = `ffmpeg -loop 1 -i ${imagePath} -i ${audioPath} -c:v libx264 -t 30 -pix_fmt yuv420p -vf scale=1080:1920 -y ${outputPath}`;
  return new Promise((resolve, reject) => {
    exec(cmd, (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}
