const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await fetchHtml('https://cavagiro.com/tienda/');
    // Find img src matching uploads
    const matches = html.match(/<img[^>]+src="([^">]+\.(jpg|png|webp))"/gi);
    if (!matches) {
       console.log("No images found, trying homepage");
       const homeHtml = await fetchHtml('https://cavagiro.com/');
       const homeMatches = homeHtml.match(/<img[^>]+src="([^">]+\.(jpg|png|webp))"/gi);
       console.log(homeMatches ? homeMatches.slice(0, 10).join('\n') : "Still no images");
       return;
    }
    console.log(matches.slice(0, 10).join('\n'));
  } catch (e) {
    console.error(e);
  }
}

run();
