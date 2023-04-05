const numWords = require('num-words');
function writeToPDF(req, doc, table, total) {
    doc
        .fontSize(19)
        .font("Helvetica-Bold")
        .text('SURYA TRANSPORT CORPORATION', {
            underline: true,
            align: 'center'
        });
    doc
        .fontSize(12)
        .font("Helvetica-Oblique")
        .text('#F3, S.G.S Silver Oak Apartments, Kuvempu Road, Sneha Colony,', {
            align: 'center',
        })
        .moveDown(0.1)
        .text('Chikkalsandra, Bengaluru – 560061', {
            align: 'center'
        })
    doc
        .font("Helvetica")
        .moveDown()
        .text('Century Plyboard (I) Ltd', {
            align: 'left',
            continued: true
        })
        .text('Mob: +91-9845790933', {
            align: 'right'
        })
        .moveDown(0.1)
        .text('Richmond Road, Bengaluru', {
            align: 'left',
            continued: true
        })
        .text(`STC/CENTURY/${req.params?.year}/${req.params?.billNo}`, {
            align: 'right'
        })
        .moveDown(1)
        .text(`Below table indicates the transportation of plywood for the month of ${req.params?.month} 2023`, {
            align: 'center'
        });
    doc
        .moveDown(3)
        .table(table, {
            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(9),
            columnsSize: [30, 60, 80, 50, 160, 100],
            width: 480,
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {

                const {x = 0, y = 0, width, height} = rectCell;
                doc.font("Helvetica").fontSize(9);
                // first line 
                if(indexColumn === 0){
                doc       
                  .lineWidth(.5)
                  .moveTo(x, y - height)
                  .lineTo(x, y + height)
                  .stroke();  
                doc
                  .moveTo(72,y - height -1)
                  .lineTo(552, y - height -1)
                  .stroke();
                }
          
                doc
                .lineWidth(.5)
                .moveTo(x + width, y - height -1)
                .lineTo(x + width, y + height -1)
                .stroke();
                  
                //doc.fontSize(10);
            }
              
        });

    doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .text(`Grand Total ${total}.00/-`, {
            align: 'right'
        })
        .moveDown(1)
        .fontSize(10)
        .text(`(Rupees: ${numWords(total)?.charAt(0)?.toUpperCase() + numWords(total)?.slice(1)} only)`, {
            align: 'justify', 
            fontFamily: 'Courier-Bold'
        });
    doc.end();
}

module.exports = {
    writeToPDF
}