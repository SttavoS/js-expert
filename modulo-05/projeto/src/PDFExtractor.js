import { readFile } from "node:fs/promises";
import { PDFExtract } from "pdf.js-extract";

export default class PDFExtractor {
  constructor() {
    this.extractor = new PDFExtract();
  }

  async extractText(pdfPath) {
    try {
      const dataBuffer = await readFile(pdfPath);

      const data = await this.extractor.extractBuffer(dataBuffer);

      const fullText = data.pages
        .map((page) => {
          return page.content.map((item) => item.str).join(" ");
        })
        .join("\n\n");

      return {
        text: fullText,
        numberOfPages: data.pages.length,
        metadata: data.meta,
        pages: data.pages,
      };
    } catch (error) {
      console.error("Erro ao processar o PDF: ", error);
      throw error;
    }
  }
}
