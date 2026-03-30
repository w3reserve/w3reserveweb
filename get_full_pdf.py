import PyPDF2

pdf_path = "/Users/berenguus/Desktop/Wine 3 Nuestros Vinos 2026.pdf"

try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        with open("pdf_content.txt", "w") as out:
            out.write(text)
        print("Success")
except Exception as e:
    print(f"Error: {e}")
