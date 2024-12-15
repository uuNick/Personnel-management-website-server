const { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun, VerticalAlign } = require('docx');

const getColumnTitles = (data) => {
    if (data.length === 0) return [];

    const lastItem = data[data.length - 1];
    console.log(data);
    if ('diagnosis' in lastItem) {
        return ['ФИО', 'ID Документа', 'Начало', 'Конец', 'Диагноз'];
    } else if ('type' in lastItem) {
        return ['ФИО', 'ID Документа', 'Начало', 'Конец', 'Тип'];
    } else if ('reason' in lastItem) {
        return ['ФИО', 'Начало', 'Конец', 'Причина']; // Здесь нет document_id
    }

    return [];
};

const createTable = (data) => {
    const columnTitles = getColumnTitles(data);

    const headerRow = new TableRow({
        children: columnTitles.map(title => new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 28, })], alignment: 'center' })],
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: 'b4c6e7' }
        })),
    });

    const rows = data.map(item => {
        const cells = [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.fullname, size: 28 })], alignment: 'center' })] }),
        ];

        // Добавляем document_id если он есть в структуре
        if ('document_id' in item) {
            cells.push(new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.document_id.toString(), size: 28 })], alignment: 'center' })] }));
        }

        cells.push(
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.start_date, size: 28 })], alignment: 'center' })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.end_date, size: 28 })], alignment: 'center' })] })
        );

        // Добавляем соответствующее поле в зависимости от структуры
        if ('diagnosis' in item) {
            cells.push(new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.diagnosis, size: 28 })], alignment: 'center' })] }));
        } else if ('type' in item) {
            cells.push(new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.type, size: 28 })], alignment: 'center' })] }));
        } else if ('reason' in item) {
            cells.push(new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.reason, size: 28 })], alignment: 'center' })] }));
        }

        return new TableRow({
            children: cells,
        });
    });

    return new Table({
        rows: [headerRow, ...rows],
        width: { size: 100, type: WidthType.PERCENTAGE },
    });
};

class WordService {
    async generateWordDocument(data) {
        const doc = new Document({
            sections: [{
                properties: {},
                children: [createTable(data)],
            }],
        });

        const buffer = await Packer.toBuffer(doc);
        return buffer;
    }
}

module.exports = new WordService();