const xlsx = require('xlsx');
const Style = require('xlsx-style');

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

        const uniqueKeys = [...new Set(data.flatMap(item => Object.keys(item)))];
        const columnHeaders = uniqueKeys.map(key => this.columnMapping[key] || key);
        const worksheetData = [columnHeaders];

        data.forEach(item => {
            const rowData = columnHeaders.map(header => {
                const key = Object.keys(this.columnMapping).find(k => this.columnMapping[k] === header);
                const value = item[key] || '';
                return value;
            });
            worksheetData.push(rowData);
        });

        const ws = xlsx.utils.aoa_to_sheet(worksheetData);


        // Автоматическое определение ширины колонок
        const colWidths = ws['!cols'] || [];
        for (let i = 0; i < worksheetData[0].length; i++) {
            let maxWidth = worksheetData[0][i].length; // Ширина заголовка
            for (let j = 1; j < worksheetData.length; j++) {
                maxWidth = Math.max(maxWidth, worksheetData[j][i].toString().length);
            }
            colWidths[i] = { wch: maxWidth + 2 }; // Добавляем 2 для отступов
        }
        ws['!cols'] = colWidths;

        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Report');
        const buffer = xlsx.write(wb, { type: 'buffer' });
        return buffer;
    }
}

module.exports = new ExcelService();
