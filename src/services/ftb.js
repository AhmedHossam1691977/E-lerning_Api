import ftp from 'basic-ftp';
import path from 'path';

export async function uploadToFTP(localFilePath, remoteFileName ) {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  client.ftp.timeout = 60000;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });

    const remoteFilePath = path.join(remoteFileName);
    await client.uploadFrom(localFilePath, remoteFilePath);
    console.log(`File uploaded to: ${remoteFilePath}`);
    return `https://${process.env.FTP_HOST}${remoteFilePath}`;
  } catch (err) {
    console.error('FTP upload failed:', err);
    throw new Error('FTP upload failed');
  } finally {
    client.close();
  }
}