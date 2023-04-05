const numWords = require('num-words');
function writeToPDF(req, doc, table, total) {
    doc
        .fontSize(19)
        .text('SURYA TRANSPORT CORPORATION', {
            underline: true,
            align: 'center'
        });
    doc
        .fontSize(12)
        .text('#F3, S.G.S Silver Oak Apartments, Kuvempu Road, Sneha Colony,', {
            align: 'center',
        })
        .moveDown(0.1)
        .text('Chikkalsandra, Bengaluru – 560061', {
            align: 'center'
        })
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
        doc.fontSize(10)
        .table(table, {
            //columnsSize: [30, 50, 60, 50, 100, 70],
            width: 480,
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {

                const {x = 0, y = 0, width, height} = rectCell;
          
                // first line 
                if(indexColumn === 0){
                doc                
                  .fontSize(7)
                  .lineWidth(.5)
                  .moveTo(x, y - height)
                  .lineTo(x, y + height)
                  .stroke();  
                doc
                  .fontSize(7)
                  .moveTo(72,y - height -1)
                  .lineTo(552, y - height -1)
                  .stroke();
                }
          
                doc
                .fontSize(7)
                .lineWidth(.5)
                .moveTo(x + width, y - height)
                .lineTo(x + width, y + height)
                .stroke();
                  
                //doc.fontSize(10);
            }
              
        });

    doc
        .fontSize(11)
        .text(`Grand Total ${total}.00/-`, {
            align: 'right'
        })
        .fontSize(10)
        .text(`(Rupees: ${numWords(total)?.charAt(0)?.toUpperCase() + numWords(total).slice(1)} only)`, {
            align: 'left', 
            fontFamily: 'Courier-Bold'
        });
    doc.end();
}

module.exports = {
    writeToPDF
}