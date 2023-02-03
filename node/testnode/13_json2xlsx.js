const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

function toExecl() {
  const jsonStr = fs.readFileSync(path.join(__dirname, 'a.json'), 'utf-8');
  const data = JSON.parse(jsonStr);
  const datas = data.map((item) => Object.values(item));

  console.log('datas', datas);
  const excelBuffer = xlsx.build([
    {
      name: 'sheet1',
      data: datas,
    },
  ]);
  fs.writeFileSync(path.join(__dirname, 'a.csv'), excelBuffer, { flag: 'w' });
}

toExecl();
