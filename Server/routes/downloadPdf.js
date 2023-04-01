const express = require("express");
const fs = require("fs");
const router = express.Router();
const app = express();

// Define a route that will send the PDF file to the client
router.get("download", (req, res) => {
  const filePath = "output.pdf"; // Replace with the actual file path
  const fileName = "output.pdf"; // Replace with the actual file name

  // Read the file from disk
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
      return;
    }

    // Send the file in the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.send(data);
  });
});

module.exports = router

