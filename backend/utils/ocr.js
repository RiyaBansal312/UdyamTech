import Tesseract from "tesseract.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export const extractTextFromImage = async (filePath) => {
  try {
    // Preprocess image: grayscale + thresholding for better OCR
    const processedPath = filePath.replace(/\.(\w+)$/, "_processed.png");
    await sharp(filePath)
      .grayscale()
      .threshold(150) // increases contrast
      .toFile(processedPath);

    // OCR with page segmentation mode 6 (assume single uniform block of text)
    const result = await Tesseract.recognize(processedPath, "eng", {
      tessedit_pageseg_mode: 6
    });

    const text = result.data.text;

    // Save raw OCR output for debugging
    const debugFile = path.join("uploads", `ocr_debug_${Date.now()}.txt`);
    fs.writeFileSync(debugFile, text, "utf8");
    console.log(`📝 OCR text saved to ${debugFile}`);

    // Cleanup processed image
    fs.unlinkSync(processedPath);

    return text;
  } catch (err) {
    console.error("OCR Error:", err);
    return "";
  }
};
