import { useState } from "react";
import ExcelJS from "exceljs";

export function useExcel(headers: Partial<ExcelJS.Column>[]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Report Data");

  worksheet.columns = headers;

  const [fileName, setFileName] = useState<string>("excel-data.xlsx");

  function saveFile(value: any[]) {
    // Resize columns
    worksheet.columns.forEach((column: any) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
    });

    console.log(value);

    if (value.length === 0) {
      return;
    }

    worksheet.addRows(value);
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.ms-excel" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
    });
  }

  return {
    setFileName,
    saveFile,
  };
}
