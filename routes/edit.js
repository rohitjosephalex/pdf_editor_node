const express = require('express');
const router = express.Router();
const multer = require('multer');
const edit=require('../services/edit')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


router.get('/hello', async (req, res) => {
    res.status(200).send("Hello");
});


router.post('/edit-pdf', upload.any(), async (req, res) => {
    try {
        // console.log('editpdf',req.files)
        const pdfBuffer = req.files;
        const { checkbox, selectedPages } = req.body;
        // const orderArray = [3, 1, 2, 4, 5, 7, 11, 6, 8, 10, 9, 12];
        // const pageArray = [1, 2, 3, 5, 7, 9, 10, 12];
   console.log('checkbox',JSON.parse(checkbox),JSON.parse(selectedPages))
    
        // Process the uploaded PDF
        const editedPDFBuffer = await edit.reorderPDF(pdfBuffer[0].buffer, './output.pdf', JSON.parse(selectedPages), JSON.parse(checkbox));
        console.log(editedPDFBuffer)
    
        // Send the edited PDF back to the client as a downloadable attachment
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.status(200).send(editedPDFBuffer);
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
      }
});


















module.exports = router;