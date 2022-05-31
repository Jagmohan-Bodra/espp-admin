import XLSX from 'xlsx';
import FileSaver from 'file-saver';
import moment from 'moment';

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = 'xlsx';

export const exportExcel = (fileName, dataExport, SheetNames = 'data') => {
  let ws = XLSX.utils.json_to_sheet([...dataExport]);

  ws = {
    ...ws,
    //Add width cols
    ['!cols']: [
      {wpx: 36},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
      {wpx: 120},
    ],

    ['!rows']: [{hpx: 20}, {hpx: 20}, {hpx: 20}, {hpx: 20}, {hpx: 16}],
  };

  //console.log(ws);
  const wb = {Sheets: {[SheetNames]: ws}, SheetNames: [SheetNames]};
  const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
  const data = new Blob([excelBuffer], {type: fileType});
  FileSaver.saveAs(data, `${fileName}_${moment().valueOf()}.${fileExtension}`);
};

export const exportHtmlToExcel = (
  fileName,
  dataExport,
  SheetNames = 'data',
) => {
  const ws = XLSX.utils.table_to_sheet(dataExport);
  const wb = {Sheets: {[SheetNames]: ws}, SheetNames: [SheetNames]};
  const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
  const data = new Blob([excelBuffer], {type: fileType});
  FileSaver.saveAs(data, `${fileName}_${moment().valueOf()}.${fileExtension}`);
};
