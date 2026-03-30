import PyPDF2

pdf_path = "/Users/berenguus/Desktop/Wine 3 Nuestros Vinos 2026.pdf"

try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print(text[:1500]) # Just print the beginning which has the history
except Exception as e:
    print(f"Error: {e}")
