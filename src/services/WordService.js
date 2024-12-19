const { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun, VerticalAlign } = require('docx');

const getColumnTitles = (data) => {
    if (data.length === 0) return [];

    const lastItem = data[data.length - 1];
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

const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

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

    async generateDismissDocument(data) {
        const spacingSymbols = "\t\t\t\t\t\t\t\t\t"

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${spacingSymbols}Директору`,
                                size: 28,
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${spacingSymbols}ОАО «Зенит»`,
                                size: 28,
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${spacingSymbols}Войтеховичу А. Н.`,
                                size: 28,
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${spacingSymbols}от ${data.document_data || new Date()}`,
                                size: 28,
                            })
                        ]
                    }),
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\nЗаявление",
                                bold: true,
                                size: 32,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `\nПрошу уволить меня с должности "${data.position}" по собственному желанию ${data.dismiss_date}`,
                                size: 28,
                            })
                        ]
                    }),
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${date}\t\t\t\t\t\t${date.fullname}`,
                                size: 28,
                            }),
                            new TextRun({
                                text: " ______________",
                                size: 28,
                            }),
                        ]
                    }),
                ],
            }],
        });

        const buffer = await Packer.toBuffer(doc);
        return buffer;
    }

    async generateVacationDocument(data) {
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `ПРИКАЗ О ПРЕДОСТАВЛЕНИИ ОТПУСКА`,
                                size: 28,
                                bold: true
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 28,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 28,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `\t\t\tОАО «Зенит»\t\t\t`,
                                size: 28,
                                underline: {},
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `наименование организации`,
                                size: 20,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 32,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 32,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ПРИКАЗ",
                                size: 28,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\t\t\t № \t\t",
                                size: 28,
                                underline: {}
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "\t\t\t\t\t\t",
                                size: 28,
                                underline: {}
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "место издания",
                                size: 20,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 20,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "О предоставлении отпуска",
                                size: 28,
                                bold: true,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 20,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ПРЕДОСТАВИТЬ",
                                size: 28,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `\t\t\t\t${data.fullname}\t\t\t\t`,
                                size: 28,
                                underline: {},
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ФИО",
                                size: 20,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `\t\t\t\t${data.position}\t\t\t\t`,
                                size: 28,
                                underline: {},
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "должность",
                                size: 20,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `\t\t\t\t${data.type}\t\t\t\t`,
                                size: 28,
                                underline: {},
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "вид отпуска",
                                size: 20,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `\t\t\t${data.amount}\t\t\t`,
                                size: 28,
                                underline: {},
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "количество календарных дней",
                                size: 20,
                            })
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "c",
                                size: 28,
                            }),
                            new TextRun({
                                text: `\t\t${data.start_date}\t\t`,
                                size: 28,
                                underline: {}
                            }),
                            new TextRun({
                                text: " по ",
                                size: 28,
                            }),
                            new TextRun({
                                text: `\t\t${data.end_date}\t\t`,
                                size: 28,
                                underline: {}
                            }),
                        ],
                        alignment: 'center'
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 20,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Директор ОАО \"Зенит\"",
                                size: 28,
                            }),
                            new TextRun({
                                text: "\t\t",
                                size: 28,
                            }),
                            new TextRun({
                                text: "\t\t",
                                size: 28,
                                underline: {}
                            }),
                            new TextRun({
                                text: "\t",
                                size: 28,
                            }),
                            new TextRun({
                                text: "\tВойтехович А. Н.\t",
                                size: 28,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 20,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 20,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "С приказом ознакомлен",
                                size: 28,
                            }),
                            new TextRun({
                                text: "\t\t",
                                size: 28,
                            }),
                            new TextRun({
                                text: "\t\t",
                                size: 28,
                                underline: {}
                            }),
                            new TextRun({
                                text: "\t\t",
                                size: 28,
                            }),
                            new TextRun({
                                text: `${data.employeeName}`,
                                size: 28,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                size: 20,
                            })
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${getCurrentDate()}`,
                                size: 28,
                            })
                        ],
                        alignment: 'right',
                    }),

                ],
            }],
        });
        const buffer = await Packer.toBuffer(doc);
        return buffer;
    }
}

module.exports = new WordService();