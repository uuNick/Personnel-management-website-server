const PDFDocument = require("pdfkit-table");
const { PassThrough } = require("stream");
const { promisify } = require("util");
const path = require("path");

class PDFService {
    constructor() {
        this.columnMapping = {
            id: 'ID',
            document_id: 'Документ ID',
            fullname: "ФИО",
            start_date: 'Начало',
            end_date: 'Конец',
            diagnosis: 'Диагнозы',
            reason: 'Причина',
            type: 'Тип'
        };
    }

    async generatePDF(data) {

        console.log(data)

        const uniqueKeys = [...new Set(data.flatMap(item => Object.keys(item)))];
        const columnHeaders = uniqueKeys.map(key => this.columnMapping[key] || key);

        let doc = new PDFDocument({ margin: 30, size: 'A4' });

        const passThrough = new PassThrough();

        const getBuffer = promisify((callback) => {
            const buffers = [];
            passThrough.on('data', (chunk) => buffers.push(chunk));
            passThrough.on('end', () => callback(null, Buffer.concat(buffers)));
        });

        doc.pipe(passThrough);

        doc.font(path.join(__dirname, 'Roboto/Roboto-Regular.ttf'));
        doc.font(path.join(__dirname, 'Roboto/Roboto-Bold.ttf'));

        const rows = data.map(item => {
            return uniqueKeys.map(key => item[key] || '');
        });

        const table = {
            title: "",
            subtitle: "",
            headers: columnHeaders,
            rows: rows
        };
        doc.table(table, {
            prepareHeader: () => doc.font("Roboto-Bold").fontSize(8),
            prepareRow: (row, indexColumn, indexRow, rectRow) => {
                doc.font("Roboto-Regular").fontSize(8);
                indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? 'blue' : 'green'), 0.15);
            },
        });


        doc.end();
        return await getBuffer();
    }
}

module.exports = new PDFService();