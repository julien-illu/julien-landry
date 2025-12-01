const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = './images';
const outputFolder = './images';
const sizes = [400, 800, 1200, 1920];

fs.readdir(inputFolder, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) return;

    const name = path.basename(file, ext);

    sizes.forEach(size => {
      const outputName = `${name}_${size}.webp`;
      sharp(path.join(inputFolder, file))
        .resize({ width: size })
        .webp({ quality: 90 }) // qualité très haute, quasi sans perte
        .toFile(path.join(outputFolder, outputName))
        .then(() => console.log(`Created ${outputName}`))
        .catch(err => console.error(err));
    });
  });
});
