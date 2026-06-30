const https = require('https');
const fs = require('fs');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
        const targetUrl = res.statusCode !== 200 ? res.headers.location : url;
        const realUrl = targetUrl.startsWith('http') ? targetUrl : 'https:' + targetUrl;
        https.get(realUrl, options, (res2) => {
          if (res2.statusCode !== 200) return reject(new Error('Status ' + res2.statusCode));
          const file = fs.createWriteStream(dest);
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        });
      } else {
        reject(new Error('Status ' + res.statusCode));
      }
    });
  });
}

(async () => {
  try {
    await download('https://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg', 'gallery_image_10.jpg');
    console.log('Downloaded 10');
    await new Promise(r => setTimeout(r, 2000));
    await download('https://upload.wikimedia.org/wikipedia/commons/c/cd/Kermit_the_Frog_at_the_2011_San_Diego_Comic-Con_International.jpg', 'gallery_image_11.jpg');
    console.log('Downloaded 11');
  } catch (e) { console.error(e); }
})();
