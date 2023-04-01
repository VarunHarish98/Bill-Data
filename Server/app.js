const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: '*'
}));

const shopRoutes = require('./routes/generatePdf');
const downloadPDF = require('./routes/downloadPdf')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(shopRoutes)
app.use(downloadPDF)

app.listen(3000);


