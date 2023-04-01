const express = require("express");
// const pdfkit = require('pdfkit');
const router = express.Router();
const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const { writeToPDF } = require("../utils.js");
const app = express();
const headers = [
  { label: "Sl.No", align: "center" },
  { label: "Date", align: "center" },
  { label: "LR No", align: "center" },
  { label: "Bill No", align: "center" },
  { label: "Destination", align: "center" },
  { label: "Freight Amount", align: "center" },
];

router.post("/generate_pdf/:month/:billNo", (req, res) => {
  try {
    const doc = new PDFDocument({ size: "A4" });
    //console.log(res)
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
    // Get the data from the user input
    const data = req.body?.data 
    // Write the data to the PDF document
    let total = 0;
    if (data && Array.isArray(data)) {
      for (let i in data) {
        total += Number(data[i][5]);
      }
      const table = {
        headers: headers,
        rows: data,
        options: {
          fontSize: 10,
        },
      };
      doc.pipe(fs.createWriteStream("output.pdf"));
      writeToPDF(req, doc, table, total);
      let filename = "OP.pdf";
      filename = encodeURIComponent(filename);
      res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');
      
    }
  } catch (error) {
    console.log(error)
    res.send({
        error
    })
  }
});

module.exports = router
