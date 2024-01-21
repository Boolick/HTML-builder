const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function displayFileInfo() {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(folderPath, file.name);
      const fileStats = await fs.stat(filePath);

      if (file.isFile()) {
        const fileSizeInKB = (fileStats.size / 1024).toFixed(3);

        console.log(
          `${file.name}-${path.extname(file.name).slice(1)}-${fileSizeInKB}kb`,
        );
      }
    }
  } catch (err) {
    console.error('Error reading folder:', err.message);
  }
}

displayFileInfo();
