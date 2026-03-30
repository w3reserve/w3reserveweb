const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = '/Users/berenguus/Desktop/Wine 3 Nuestros Vinos 2026.pdf';

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error('Error parsing PDF:', err);
});
