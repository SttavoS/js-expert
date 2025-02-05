"use strict";

import { join } from "node:path";
import PDFExtractor from "./PDFExtractor.js";

(async () => {
  const filePath = join(import.meta.dirname, "../docs/contrato.pdf");

  const fds = new PDFExtractor();
  const result = await fds.extractText(filePath);

  console.log(result.text);
})();
