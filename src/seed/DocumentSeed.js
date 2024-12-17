// const { sequelize } = require("../db");
const Document = require("../models/Document");

class DocumentSeed {
    async seed() {
        const documentsData = [
            {
                employee_id: 1,
                document_type: 'Больничный лист',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734079405768-622451447.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 1 номер 1'
            },
            {
                employee_id: 1,
                document_type: 'Больничный лист',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734079614133-241476002.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 1 номер 2'
            }, //correct
            {
                employee_id: 2,
                document_type: 'Больничный лист',
                upload_date: '2024-12-10',
                file_name: 'pdfFile-1734079658972-183210671.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 2 номер 1'
            },
            {
                employee_id: 2,
                document_type: 'Больничный лист',
                upload_date: '2024-12-10',
                file_name: 'pdfFile-1734079673823-856619809.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 2 номер 2'
            }, // correct
            {
                employee_id: 3,
                document_type: 'Больничный лист',
                upload_date: '2024-12-11',
                file_name: 'pdfFile-1734079693849-201059196.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 3 номер 1'
            }, // correct
            {
                employee_id: 4,
                document_type: 'Больничный лист',
                upload_date: '2024-12-09',
                file_name: 'pdfFile-1734079711073-776472471.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 4 номер 1'
            },
            {
                employee_id: 4,
                document_type: 'Больничный лист',
                upload_date: '2024-12-09',
                file_name: 'pdfFile-1734079722772-22211067.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 4 номер 2'
            }, // correct
            {
                employee_id: 5,
                document_type: 'Больничный лист',
                upload_date: '2024-12-11',
                file_name: 'pdfFile-1734079739031-472726313.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 5 номер 1'
            },
            {
                employee_id: 5,
                document_type: 'Больничный лист',
                upload_date: '2024-12-11',
                file_name: 'pdfFile-1734079762412-317032001.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 5 номер 2'
            }, // correct
            {
                employee_id: 6,
                document_type: 'Больничный лист',
                upload_date: '2024-12-08',
                file_name: 'pdfFile-1734079784742-804360497.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 6 номер 1'
            }, // correct
            {
                employee_id: 7,
                document_type: 'Больничный лист',
                upload_date: '2024-12-12',
                file_name: 'pdfFile-1734079805268-77321715.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 7 номер 1'
            }, // correct
            {
                employee_id: 8,
                document_type: 'Больничный лист',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734079828547-646822510.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 8 номер 1'
            }, // correct
            {
                employee_id: 9,
                document_type: 'Больничный лист',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734079841320-417951448.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 9 номер 1'
            }, //correct
            {
                employee_id: 9,
                document_type: 'Больничный лист',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734079850112-311905444.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 9 номер 2'
            }, // correct
            {
                employee_id: 14,
                document_type: 'Больничный лист',
                upload_date: '2024-12-10',
                file_name: 'pdfFile-1734079870531-953670957.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 10 номер 1'
            },
            {
                employee_id: 15,
                document_type: 'Больничный лист',
                upload_date: '2024-12-12',
                file_name: 'pdfFile-1734079886653-159239361.pdf',
                notes: 'Больничный лист для сотрудника с идентификатором 11 номер 1'
            },
            {
                employee_id: 1,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-09',
                file_name: 'pdfFile-1734080038101-75389482.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 1'
            },
            {
                employee_id: 2,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-10',
                file_name: 'pdfFile-1734080135933-776161669.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 2'
            },
            {
                employee_id: 3,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-11',
                file_name: 'pdfFile-1734080150287-482705913.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 3'
            },
            {
                employee_id: 4,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-11',
                file_name: 'pdfFile-1734080161711-796464856.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 4'
            },
            {
                employee_id: 5,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-12',
                file_name: 'pdfFile-1734080620067-74989633.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 5'
            },
            {
                employee_id: 6,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-10',
                file_name: 'pdfFile-1734083759412-892774131.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 6'
            },
            {
                employee_id: 7,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-09',
                file_name: 'pdfFile-1734083775365-583164503.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 7'
            },
            {
                employee_id: 8,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734083796642-728081440.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 8'
            },
            {
                employee_id: 9,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734083806166-160015229.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 9'
            },
            {
                employee_id: 10,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-08',
                file_name: 'pdfFile-1734083829290-338437768.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 10'
            },
            {
                employee_id: 11,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-12',
                file_name: 'pdfFile-1734083839606-331305643.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 11'
            },
            {
                employee_id: 12,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-12',
                file_name: 'pdfFile-1734083847861-695016229.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 12'
            },
            {
                employee_id: 13,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734083858364-805767914.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 13'
            },
            {
                employee_id: 14,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-13',
                file_name: 'pdfFile-1734083867424-236197384.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 14'
            },
            {
                employee_id: 15,
                document_type: 'Приказ на отпуск',
                upload_date: '2024-12-10',
                file_name: 'pdfFile-1734083879585-929559007.pdf',
                notes: 'Приказ на отпуск для сотрудника с идентификатором 15'
            }
        ];

        try {
            const existingDocuments = await Document.findAll();
            if (existingDocuments.length === 0) {
                await Document.bulkCreate(documentsData);
                console.log("Таблица документов успешно заполнена.");
            } else {
                console.log(
                    "Таблица документов уже содержит записи. Новые записи не будут добавлены."
                );
            }
        } catch (error) {
            console.error("Ошибка при заполнении таблицы документов:", error);
        }
    }
}

module.exports = DocumentSeed;