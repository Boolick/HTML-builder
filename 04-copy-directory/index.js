const fs = require('fs/promises');
const path = require('path');

const sourceFolderPath = path.join(__dirname, 'files');
const destinationFolderPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(destinationFolderPath, { recursive: true });
    const files = await fs.readdir(sourceFolderPath);

    for (const file of files) {
      const sourceFilePath = path.join(sourceFolderPath, file);
      const destinationFilePath = path.join(destinationFolderPath, file);
      const fileStats = await fs.stat(sourceFilePath);

      if (fileStats.isFile()) {
        await fs.copyFile(sourceFilePath, destinationFilePath);
        console.log(`Copied file: ${file}`);
      } else if (fileStats.isDirectory()) {
        await copyDirRecursive(sourceFilePath, destinationFilePath);
        console.log(`Copied directory: ${file}`);
      }
    }

    console.log('Copy completed successfully!');
  } catch (err) {
    console.error('Error copying directory:', err.message);
  }
}
async function copyDirRecursive(source, destination) {
  await fs.mkdir(destination, { recursive: true });

  const files = await fs.readdir(source);

  for (const file of files) {
    const sourceFilePath = path.join(source, file);
    const destinationFilePath = path.join(destination, file);

    const fileStats = await fs.stat(sourceFilePath);

    if (fileStats.isFile()) {
      await fs.copyFile(sourceFilePath, destinationFilePath);
    } else if (fileStats.isDirectory()) {
      await copyDirRecursive(sourceFilePath, destinationFilePath);
    }
  }
}

copyDir();
