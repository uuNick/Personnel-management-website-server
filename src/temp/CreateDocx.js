const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

const createDocument = (employeeName, position, start_date, end_date, amount, type) => {

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
                            text: `\t\t\t\t${employeeName}\t\t\t\t`,
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
                            text: `\t\t\t\t${position}\t\t\t\t`,
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
                            text: `\t\t\t\t${type}\t\t\t\t`,
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
                            text: `\t\t\t${amount}\t\t\t`,
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
                            text: `\t\t${start_date}\t\t`,
                            size: 28,
                            underline: {}
                        }),
                        new TextRun({
                            text: " по ",
                            size: 28,
                        }),
                        new TextRun({
                            text: `\t\t${end_date}\t\t`,
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
                            text: `${employeeName}`,
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

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("Заявление.docx", buffer);
    }).catch((error) => {
        console.error("Ошибка при создании документа:", error);
    });
};

// Пример использования
createDocument("Иванов И. И.", "менеджер", '2024-01-01', '2024-01-28', 28, 'Оплачиваемый');