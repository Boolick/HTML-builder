const fs = require('fs/promises');
const path = require('path');

const sourceFolderPath = path.join(__dirname, 'files');
const destinationFolderPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(destinationFolderPath, { recursive: true });
    const files = await fs.readdir(sourceFolderPath);
    await cleanDestinationFolder(files);

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

async function cleanDestinationFolder(sourceFiles) {
  // Читаем содержимое files-copy
  const destinationFiles = await fs.readdir(destinationFolderPath);

  const itemsToRemove = destinationFiles.filter(
    (item) => !sourceFiles.includes(item),
  );

  for (const itemToRemove of itemsToRemove) {
    const itemPathToRemove = path.join(destinationFolderPath, itemToRemove);
    await removeItemRecursive(itemPathToRemove);
  }
}

async function removeItemRecursive(itemPath) {
  const itemStats = await fs.stat(itemPath);

  if (itemStats.isFile()) {
    // Если это файл, удаляем его
    await fs.unlink(itemPath);
  } else if (itemStats.isDirectory()) {
    // Если это директория, рекурсивно удаляем
    const items = await fs.readdir(itemPath);

    for (const item of items) {
      const itemFullPath = path.join(itemPath, item);
      await removeItemRecursive(itemFullPath);
    }

    // Удаляем саму папку
    await fs.rmdir(itemPath);
  }
}

async function copyDirRecursive(source, destination) {
  // Копируем файлы и папки
  await fs.mkdir(destination, { recursive: true });

  const files = await fs.readdir(source);

  // рекурсивно копируем файлы
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
