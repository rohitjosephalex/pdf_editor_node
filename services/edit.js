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

// reorderPDF(inputPDFPath,outputPDFPath,array1,array2);
module.exports={reorderPDF}
