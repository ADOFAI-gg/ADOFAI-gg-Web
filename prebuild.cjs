const fs = require('fs');
const path = require('path');
const Axios = require('axios');
const unzipper = require('unzipper');
const rimraf = require('rimraf');

const assetsDir = path.join(__dirname, 'static', 'assets');

rimraf.sync(assetsDir);

const cacheDir = path.join(__dirname, '.cache');

rimraf.sync(cacheDir);

fs.mkdirSync(cacheDir);

const zip = path.join(cacheDir, 'assets.zip');

console.log('Downloading assets...');

const writer = fs.createWriteStream(zip);

return Axios({
  method: 'get',
  url: 'https://github.com/ADOFAI-gg/Adofai-gg-assets/archive/refs/heads/main.zip',
  responseType: 'stream'
})
  .then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  })
  .then(async () => {
    const directory = await unzipper.Open.file(zip);
    await directory.extract({
      path: cacheDir
    });
    require('fs-extra').move(path.join(cacheDir, 'Adofai-gg-assets-main'), assetsDir);
  });
