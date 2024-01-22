const fs = require('fs/promises');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesFolderPath);
    const cssFiles = files.filter((file) => file.endsWith('.css'));

    const stylesArray = [];

    // Читаем и объединяем стили из файлов
    for (const cssFile of cssFiles) {
      const filePath = path.join(stylesFolderPath, cssFile);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      stylesArray.push(fileContent);
    }

    await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

    // Записываем bundle.css
    await fs.writeFile(bundleFilePath, stylesArray.join('\n'));

    console.log('Styles merged successfully!');
  } catch (err) {
    console.error('Error merging styles:', err.message);
  }
}

mergeStyles();
