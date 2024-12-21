const PDFDocument = require("pdfkit-table");
const { PassThrough } = require("stream");
const { promisify } = require("util");
const path = require("path");

const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

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

    async generatePDF(data, name) {

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

        doc.fontSize(20).font('Roboto-Bold').text(`Отчёт от ${getCurrentDate()}\n\n${name}`, { align: 'center' });
        doc.moveDown(); 

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