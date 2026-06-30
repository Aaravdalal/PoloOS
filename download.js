const https = require('https');
const fs = require('fs');

const images = [
  { url: 'https://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg', name: 'gallery_image_8.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Kermit_the_Frog_at_the_2011_San_Diego_Comic-Con_International.jpg', name: 'gallery_image_9.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/3/36/Polo_G_-_Hall_of_Fame.png', name: 'album_hall_of_fame.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/3/37/Polo_G_-_The_Goat.png', name: 'album_the_goat.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/c/c5/The_Muppet_Show.jpg', name: 'album_muppets.jpg' }
];

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  }
};

images.forEach(img => {
  https.get(img.url, options, (res) => {
    if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
      const targetUrl = res.statusCode !== 200 ? res.headers.location : img.url;
      https.get(targetUrl.startsWith('http') ? targetUrl : 'https:' + targetUrl, options, (res2) => {
        const file = fs.createWriteStream(img.name);
        res2.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded ' + img.name);
        });
      });
    } else {
      console.log('Failed to download ' + img.name + ': ' + res.statusCode);
    }
  }).on('error', (err) => {
    console.log('Error downloading ' + img.name + ': ' + err.message);
  });
});
