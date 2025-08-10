import xlsx from "xlsx";
import fs from "fs";

export const uploadExcel = async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    fs.unlinkSync(filePath); // Delete after read

    return res.json({ parsedData: sheetData });
  } catch (err) {
    console.error("Excel parse error:", err);
    return res.status(500).json({ message: "Failed to parse Excel file." });
  }
};
