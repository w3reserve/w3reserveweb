import fitz  # PyMuPDF
import sys
import os

pdf_path = "Vinos C del pino .pdf"
output_dir = "public/pdf_images/cayetano_rest"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)
image_count = 0

for page_index in range(len(doc)):
    page = doc.load_page(page_index)
    image_list = page.get_images(full=True)
    
    for image_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # Only save large images (likely the bottles)
        if len(image_bytes) > 20000: # greater than 20KB
            image_name = f"page_{page_index+1}_img_{image_index}.{image_ext}"
            image_path = os.path.join(output_dir, image_name)
            
            with open(image_path, "wb") as image_file:
                image_file.write(image_bytes)
                image_count += 1
            print(f"Saved: {image_path} (Size: {len(image_bytes)} bytes)")

print(f"Total large images extracted: {image_count}")
