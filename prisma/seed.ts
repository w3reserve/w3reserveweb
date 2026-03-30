const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with live WooCommerce products...');
  
  await prisma.product.deleteMany({});
  await prisma.brand.deleteMany({});

  // Leer el JSON raspado
  const scrapedData = fs.readFileSync(path.join(process.cwd(), 'scraped_products.json'), 'utf-8');
  const rawProducts = JSON.parse(scrapedData);
  
  // Filtrar los inválidos y los no deseados
  const excludedNames = [
    'selecte', 'bombonetta', 'homenatge cal rei', 'pinot noir',
    'val regal enoturisme', 'cabernet sauvignon', 'tarambana negre',
    'tarambana rosat', 'tarambana blanc', 'pack cava exclusiu'
  ];

  const validProducts = rawProducts.filter((p) => {
    if (p.name === 'Unknown' || p.price <= 0) return false;
    const lowerName = p.name.toLowerCase();
    if (excludedNames.some(ex => lowerName.includes(ex))) return false;
    return true;
  }).map((p) => ({
      name: p.name,
      details: p.details || 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.',
      imageUrl: p.imageUrl.replace('-300x500', ''), // remove thumb sizing if possible
      price: p.price
  }));

  const jaumeGiro = await prisma.brand.create({
    data: {
      name: 'Caves Jaume Giró i Giró',
      origin: 'Sant Sadurní d\'Anoia, Cataluña',
      description: 'Una de las cavas artesanales más históricas y premiadas de Sant Sadurní d\'Anoia. Fundada en 1926 por Ramón Giró, nuestra bodega familiar se especializa en cavas y vinos de larga crianza elaborados con el máximo respeto por el terroir. (Catálogo Sincronizado)',
      products: {
        create: validProducts
      }
    }
  });

  const pino = await prisma.brand.create({
    data: {
      name: 'Cayetano del Pino',
      origin: 'Jerez de la Frontera, Andalucía',
      description: 'La esencia de los vinos generosos desde 1886. El placer de lo extraordinario materializado en botas seleccionadas y tiempo de crianza inigualable.',
      products: {
        create: [
          { name: 'Amontillado Solera', details: 'Ámbar con ribetes verdosos. Intenso y punzante, con notas de crianza biológica, almendras y madera. Fresco, persistente y seco. Crianza ~18 años. Maridaje ideal: Comida mexicana, alcachofas, espárragos, arroces y pescados.', imageUrl: '/pdf_images/cayetano/page_1_img_1.png', price: 15.00 },
          { name: 'Palo Cortado Solera', details: 'Ámbar con ribetes verdosos. Intenso, cálido, seco y aterciopelado. Notas de nueces y madera. Crianza ~18 años. Maridaje ideal: Guisos, carnes de caza, quesos y chocolates.', imageUrl: '/pdf_images/cayetano/page_2_img_1.png', price: 18.00 },
          { name: 'Fino', details: 'Oro con ribetes verdosos. Intenso, fino, punzante con aromas a levaduras, almendras y membrillo. Cálido y seco. Crianza ~9 años.', imageUrl: '/pdf_images/cayetano_rest/page_1_img_1.png', price: 12.00 },
          { name: 'Cream', details: 'Color castaño con ribetes ámbar. Notas de uvas pasas, avellanas y madera. Cálido, dulce y aterciopelado. Vino de postre ideal.', imageUrl: '/pdf_images/cayetano_rest/page_2_img_1.png', price: 14.00 },
          { name: 'Amontillado Superior', details: 'Ámbar, ribetes verdosos. Intenso, fresco, muy persistente y seco. Con cuerpo. Notas de almendras, avellanas y madera de Botas Añejas selectas.', imageUrl: '/pdf_images/cayetano_rest/page_3_img_1.png', price: 34.00 },
          { name: 'Palo Cortado Superior', details: 'Ámbar, ribetes verdosos. Cálido, seco, aterciopelado, muy persistente y con mucho cuerpo. Avellanas, nueces y madera de Botas Añejas selectas.', imageUrl: '/pdf_images/cayetano_rest/page_4_img_1.png', price: 39.00 },
          { name: 'Amontillado VOS', details: 'Vinum Optimum Signatum (VOS). Crianza garantizada de más de 20 años. Gran intensidad. Notas especiadas, almendra, regaliz y madera. Punzante.', imageUrl: '/pdf_images/cayetano_rest/page_5_img_1.png', price: 65.00 },
          { name: 'Palo Cortado VOS', details: 'Palo Cortado VOS (+20 años). Profundidad absoluta y un sinfín de matices.', imageUrl: '/bottle_placeholder.svg', price: 75.00 },
          { name: 'Amontillado VORS', details: 'Vinum Optimum Rare Signatum (+30 años). Muy intenso. Almendra, clavo, tabaco y maderas tostadas. Retrogusto a cacao. Excepcional complejidad.', imageUrl: '/pdf_images/cayetano_rest/page_6_img_1.png', price: 110.00 },
          { name: 'Palo Cortado VORS', details: 'Palo Cortado VORS (+30 años). Ámbar oscuro, glicérico. Almendra, roble, café y largo retrogusto a regaliz. Potente y muy profundo. El más complejo de la gama.', imageUrl: '/pdf_images/cayetano_rest/page_7_img_2.png', price: 125.00 },
        ]
      }
    }
  });

  console.log('Live Catalog seeded successfully! Products imported:', validProducts.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
