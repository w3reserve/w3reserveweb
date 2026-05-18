import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Delete existing data
    await prisma.product.deleteMany({});
    await prisma.brand.deleteMany({});

    // Caves Jaume Giró i Giró products (from scraped WooCommerce data)
    const cavaProducts = [
      { name: 'SWEET CAVA', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/SWEET-CAVA-300x500.jpg', price: 21 },
      { name: '1/2 DRY CAVA', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/1-2-DRY-CAVA-300x500.jpg', price: 21 },
      { name: 'ELABORACIÓ ARTESANA', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/Cava_brut_nature-300x500.jpg', price: 17 },
      { name: 'NET', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/net_reserva_brut_2024-300x500.jpg', price: 19 },
      { name: 'MERAVELLOUS', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/MERAVELLOUS-300x500.jpg', price: 23 },
      { name: 'MAGNUM XAREL·LO', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/magnum_xarello-300x500.jpg', price: 40 },
      { name: 'MAGNUM GRANDALLA de LUXE Swarovski® Rosat', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/grandalla_rosat2-300x500.jpg', price: 150 },
      { name: 'MAGNUM GRANDALLA de LUXE Swarovski® Blanc', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/magnum_grandalla_nou-300x500.jpg', price: 150 },
      { name: 'XAREL·LO', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/xarello_reserva-300x500.jpg', price: 25 },
      { name: 'BARON MERTEN SELECCIÓ FAMILIAR', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/baron_marten--300x500.png', price: 52 },
      { name: 'MONTANER', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/montaner_gran_reserva_2024-300x500.jpg', price: 25 },
      { name: 'GRANDALLA GRAN RESERVA', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/grandalla-plata-300x500.png', price: 45 },
      { name: 'SELECTE', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/selecte_gran_reserva-300x500.jpg', price: 33 },
      { name: 'BOMBONETTA', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/bombonetta-300x500.jpg', price: 42 },
      { name: 'HOMENATGE CAL REI', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/HOMENATGE-CAL-REI-300x500.jpg', price: 38 },
      { name: 'GRANDALLA de LUXE Swarovski®', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/grandalla-300x500.png', price: 73 },
      { name: 'PINOT NOIR', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/PINOT-NOIR-CAVA-300x500.jpg', price: 24 },
      { name: 'TREPAT de CAL REI', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/rosat_de_cal_rei_2024-300x500.jpg', price: 24 },
      { name: 'CABERNET SAUVIGNON', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/CABERNET_SAUV4-300x500.jpg', price: 14 },
      { name: 'TARAMBANA NEGRE', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/tarambana_negre-300x500.jpg', price: 12 },
      { name: 'TARAMBANA ROSAT', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/tarambana_rosat_2024-300x500.jpg', price: 12 },
      { name: 'TARAMBANA BLANC', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2024/11/tarambana_xarel_lo-300x500.jpg', price: 12 },
      { name: 'Val Regal Enoturisme', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2025/04/val-regal-enoturisme-sant-sadurni-e1743677550226-300x500.png', price: 25 },
      { name: 'Pack Cava Exclusiu', details: 'Cava excepcional de la familia Giró. Elaboración artesanal y crianza meticulosa.', imageUrl: 'https://cavagiro.com/wp-content/uploads/2025/04/pack-cava-1-scaled-e1743676544665-300x500.jpg', price: 199 },
    ];

    await prisma.brand.create({
      data: {
        name: 'Caves Jaume Giró i Giró',
        origin: "Sant Sadurní d'Anoia, Cataluña",
        description: 'Una de las cavas artesanales más históricas y premiadas de Sant Sadurní d\'Anoia. Fundada en 1926 por Ramón Giró, nuestra bodega familiar se especializa en cavas y vinos de larga crianza elaborados con el máximo respeto por el terroir.',
        products: { create: cavaProducts }
      }
    });

    await prisma.brand.create({
      data: {
        name: 'Cayetano del Pino',
        origin: 'Jerez de la Frontera, Andalucía',
        description: 'La esencia de los vinos generosos desde 1886. El placer de lo extraordinario materializado en botas seleccionadas y tiempo de crianza inigualable.',
        products: {
          create: [
            { name: 'Amontillado Solera', details: 'Ámbar con ribetes verdosos. Intenso y punzante, con notas de crianza biológica, almendras y madera. Fresco, persistente y seco. Crianza ~18 años.', imageUrl: '/pdf_images/cayetano/page_1_img_1.png', price: 15.00 },
            { name: 'Palo Cortado Solera', details: 'Ámbar con ribetes verdosos. Intenso, cálido, seco y aterciopelado. Notas de nueces y madera. Crianza ~18 años.', imageUrl: '/pdf_images/cayetano/page_2_img_1.png', price: 18.00 },
            { name: 'Fino', details: 'Oro con ribetes verdosos. Intenso, fino, punzante con aromas a levaduras, almendras y membrillo. Cálido y seco. Crianza ~9 años.', imageUrl: '/pdf_images/cayetano_rest/page_1_img_1.png', price: 12.00 },
            { name: 'Cream', details: 'Color castaño con ribetes ámbar. Notas de uvas pasas, avellanas y madera. Cálido, dulce y aterciopelado. Vino de postre ideal.', imageUrl: '/pdf_images/cayetano_rest/page_2_img_1.png', price: 14.00 },
            { name: 'Amontillado Superior', details: 'Ámbar, ribetes verdosos. Intenso, fresco, muy persistente y seco. Con cuerpo. Notas de almendras, avellanas y madera de Botas Añejas selectas.', imageUrl: '/pdf_images/cayetano_rest/page_3_img_1.png', price: 34.00 },
            { name: 'Palo Cortado Superior', details: 'Ámbar, ribetes verdosos. Cálido, seco, aterciopelado, muy persistente y con mucho cuerpo. Avellanas, nueces y madera de Botas Añejas selectas.', imageUrl: '/pdf_images/cayetano_rest/page_4_img_1.png', price: 39.00 },
            { name: 'Amontillado VOS', details: 'Vinum Optimum Signatum (VOS). Crianza garantizada de más de 20 años. Gran intensidad. Notas especiadas, almendra, regaliz y madera.', imageUrl: '/pdf_images/cayetano_rest/page_5_img_1.png', price: 65.00 },
            { name: 'Palo Cortado VOS', details: 'Palo Cortado VOS (+20 años). Profundidad absoluta y un sinfín de matices.', imageUrl: '/bottle_placeholder.svg', price: 75.00 },
            { name: 'Amontillado VORS', details: 'Vinum Optimum Rare Signatum (+30 años). Muy intenso. Almendra, clavo, tabaco y maderas tostadas. Retrogusto a cacao. Excepcional complejidad.', imageUrl: '/pdf_images/cayetano_rest/page_6_img_1.png', price: 110.00 },
            { name: 'Palo Cortado VORS', details: 'Palo Cortado VORS (+30 años). Ámbar oscuro, glicérico. Almendra, roble, café y largo retrogusto a regaliz. Potente y muy profundo.', imageUrl: '/pdf_images/cayetano_rest/page_7_img_2.png', price: 125.00 },
          ]
        }
      }
    });

    return NextResponse.json({ success: true, message: 'Base de datos poblada con 24 cavas + 10 vinos de Jerez' }, { status: 200 });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
