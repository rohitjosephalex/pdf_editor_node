const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;

const reorderPDF=async(inputPath, outputPath, orderArray,pageArray) =>{
  try {
    // console.log("orderArray",orderArray,pageArray)
    const pageOrder = orderArray.filter((element) => pageArray.includes(element));
    console.log(pageOrder)

    // const inputPDFBytes = await fs.readFile(inputPath);
    const pdfDoc = await PDFDocument.load(inputPath);


    const maxPageNumber = pdfDoc.getPageCount();

    const isValidOrder = pageOrder.every(
      (key) => key <= maxPageNumber);

    if (!isValidOrder) {
      throw new Error('Invalid pageOrder input');
    }

    // Create a new PDF with reordered pages
    const newPDFDoc = await PDFDocument.create();

    for (const x of pageOrder) {

        const newPageIndex = x - 1;
        const [copiedPage] = await newPDFDoc.copyPages(pdfDoc, [newPageIndex]);
        newPDFDoc.addPage(copiedPage);
    }

    // Save the reordered PDF to the output file
    const reorderedPDFBytes = await newPDFDoc.save();
    await fs.writeFile(outputPath, reorderedPDFBytes);

    console.log('PDF reordered successfully!');
    return(reorderedPDFBytes)
  } catch (error) {
    console.error('Error:', error.message);
  }
}
const array1 = [3, 1, 2, 4, 5, 7, 11, 6, 8, 10, 9, 12];
const array2 = [1, 2, 3, 5, 7, 9, 10, 12];

// const newArray = array1.filter((element) => array2.includes(element));

// console.log(newArray);
// Example usage
const inputPDFPath = './services/DOP_BulkCustomerIntegration_v8_1.pdf';
const outputPDFPath = './output.pdf';
const pageOrder = {
  '1': 3,
  '2': 1,
  '3': 5, // No replacement for page 3
  '4': 2,
  '5': 0
};
// reorderPDF(inputPDFPath,outputPDFPath,array1,array2);
module.exports={reorderPDF}