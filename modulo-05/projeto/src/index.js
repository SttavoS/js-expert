"use strict";

import { join } from "node:path";
import PDFExtractor from "./PDFExtractor.js";
import TextProcessorFacade from "./TextProcessorFacade.js";

// TODO: Refatorar isso para funcionar com essa biblioteca
(async () => {
  const filePath = join(import.meta.dirname, "../docs/contrato.pdf");

  const extractor = new PDFExtractor();
  const extractedPdf = await extractor.extractText(filePath);

  const facade = new TextProcessorFacade(extractedPdf.text);
  const result = facade.getPeopleFromPDF();

  console.log(result);
})();
