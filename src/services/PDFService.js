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

        // Создаем промис для получения буфера
        const getBuffer = promisify((callback) => {
            const buffers = [];
            passThrough.on('data', (chunk) => buffers.push(chunk));
            passThrough.on('end', () => callback(null, Buffer.concat(buffers)));
        });

        // Подключаем поток к PDF-документу
        doc.pipe(passThrough);

        doc.font(path.join(__dirname, 'Roboto/Roboto-Regular.ttf'));
        doc.font(path.join(__dirname, 'Roboto/Roboto-Bold.ttf'));

        const rows = data.map(item => {
            return uniqueKeys.map(key => item[key] || ''); // Создание массива строк для каждой строки
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

        // const dynamicHeaders = [];
        // if (data.some(item => item.document_id !== undefined)) {
        //     dynamicHeaders.push({ text: 'Документ ID', style: 'tableHeader' });
        // }
        // if (data.some(item => item.reason !== undefined)) {
        //     dynamicHeaders.push({ text: 'Причина', style: 'tableHeader' });
        // }
        // if (data.some(item => item.diagnosis !== undefined)) {
        //     dynamicHeaders.push({ text: 'Диагноз', style: 'tableHeader' });
        // }
        // if (data.some(item => item.type !== undefined)) {
        //     dynamicHeaders.push({ text: 'Тип отпуска', style: 'tableHeader' });
        // }

        // const headers = [...baseHeaders, ...dynamicHeaders];

        // const documentDefinition = {
        //     content: [
        //         { text: 'Отчет', style: 'header' },
        //         {
        //             table: {
        //                 body: [
        //                     baseHeaders,
        //                     ...data.map(item => {
        //                         const row = [
        //                             item.fullname,
        //                             item.start_date,
        //                             item.end_date
        //                         ];
        //                         // if (item.document_id !== undefined) row.push(item.document_id);
        //                         // if (item.reason !== undefined) row.push(item.reason);
        //                         // if (item.diagnosis !== undefined) row.push(item.diagnosis);
        //                         // if (item.type !== undefined) row.push(item.type);
        //                         return row;
        //                     })
        //                 ]
        //             }
        //         }
        //     ],
        //     styles: {
        //         header: {
        //             fontSize: 20,
        //             bold: true,
        //             margin: [0, 0, 0, 10]
        //         },
        //         tableHeader: {
        //             bold: true,
        //             fontSize: 12,
        //             color: 'black',
        //             fillColor: '#eeeeee'
        //         }
        //     }
        // };

        // const pdfDoc = new pdfMake({
        //     Roboto: { normal: new Font('Roboto-Regular.ttf'), bold: new Font('Roboto-Medium.ttf') },
        // }).createPdfKitDocument(documentDefinition);

        // return new Promise((resolve, reject) => {
        //     const chunks = [];
        //     pdfDoc.on('data', (chunk) => chunks.push(chunk));
        //     pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        //     pdfDoc.on('error', reject);
        //     pdfDoc.end();
        // });
    }
}

module.exports = new PDFService();