const https = require('https');
const fs = require('fs');

https.get('https://cavagiro.com/botiga-online/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let match;
    const regex = /<li[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
    const products = [];
    
    while ((match = regex.exec(data)) !== null) {
      const block = match[1];
      
      // Extract title
      let title = "Unknown";
      const titleMatch = block.match(/<h2[^>]*>(.*?)<\/h2>/i);
      if (titleMatch) {
         title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      }
      
      // Extract price
      let price = "0.00";
      const priceMatch = block.match(/<span class="woocommerce-Price-amount amount">[\s\S]*?<bdi>([\s\S]*?)<\/bdi><\/span>/i) || block.match(/<bdi>([\s\S]*?)<\/bdi>/i);
      if (priceMatch) {
         price = priceMatch[1].replace(/<[^>]+>/g, '').replace('&nbsp;', '').replace('€', '').replace(',', '.').trim();
      }
      
      // Extract image
      let img = "/bottle_placeholder.svg";
      const imgMatch = block.match(/<img[^>]+src="([^">]+)"/i);
      if (imgMatch) {
         // handle lazyloaded placeholders
         if (imgMatch[1].includes('data:image')) {
            const lazyMatch = block.match(/data-src="([^">]+)"/i);
            if (lazyMatch) img = lazyMatch[1];
         } else {
            img = imgMatch[1];
         }
      }
      
      products.push({
        name: title,
        details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.',
        imageUrl: img,
        price: parseFloat(price) || 0.00
      });
    }
    
    fs.writeFileSync('scraped_products.json', JSON.stringify(products, null, 2));
    console.log(`Scraped ${products.length} products successfully.`);
  });
}).on('error', (e) => console.error(e));
