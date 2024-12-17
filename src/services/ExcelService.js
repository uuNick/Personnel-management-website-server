const ExcelJS = require('exceljs');

class ExcelService {
    constructor() {
        this.columnMapping = {
            id: 'ID',
            document_id: 'Документ ID',
            fullname: "ФИО",
            start_date: 'Начало',
            end_date: 'Конец',
            diagnosis: 'Диагноз',
            reason: 'Причина',
            type: 'Тип отпуска'
        };
    }

    async generateExcelReport(data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Report');

        // Получаем уникальные ключи и заголовки
        const uniqueKeys = [...new Set(data.flatMap(item => Object.keys(item)))];
        const columnHeaders = uniqueKeys.map(key => this.columnMapping[key] || key);
        const headerRow = worksheet.addRow(columnHeaders);

        //Устанавливаем стиль для заголовков
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffb4c6e7' },
            };
            cell.border = {
                top: {
                    style: 'thin'
                },
                left: {
                    style: 'thin'
                },
                bottom: {
                    style: 'thin'
                },
                right: {
                    style: 'thin'
                }
            };
        });

        data.forEach(item => {
            const rowData = columnHeaders.map(header => {
                const key = Object.keys(this.columnMapping).find(k => this.columnMapping[k] === header);
                const value = item[key] || '';
                return value;
            });
            const row = worksheet.addRow(rowData);
            row.eachCell(function (cell) {
                cell.border = {
                    top: {
                        style: 'thin'
                    },
                    left: {
                        style: 'thin'
                    },
                    bottom: {
                        style: 'thin'
                    },
                    right: {
                        style: 'thin'
                    }
                };
            })
        });

        // Центрирование содержимого ячеек
        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
        });

        // Автоматическое определение ширины колонок
        worksheet.columns.forEach(column => {
            let maxWidth = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
                maxWidth = Math.max(maxWidth, cell.value ? cell.value.toString().length : 0);
            });
            column.width = maxWidth + 2; // Добавляем немного отступа
        });

        // Генерация буфера для возврата
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }
}

module.exports = new ExcelService();