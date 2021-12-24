const { Client } = require('ssh2');

const conn = new Client();
conn
  .on('ready', () => {
    console.log('链接成功');
    conn.exec(
      'nvidia-smi --format=csv --query-gpu=timestamp,name,pci.bus_id,driver_version,pstate,pcie.link.gen.max,pcie.link.gen.current,temperature.gpu,utilization.gpu,utilization.memory,memory.total,memory.free,memory.used,uuid',
      (err, stream) => {
        if (err) {
          console.log('执行失败');
          return;
        }
        const dataArr = []
        stream.on('data', (data) => {
          const dataStr = data.toString().replace(/\n/g , '')
          console.log('dataStr', dataStr)
          dataArr.push(dataStr)
        }).on('close', () => {
          console.log('dataArr', dataArr)
          conn.end()
        })
      }
    );
  })
  .connect({
    host: '10.68.4.102',
    port: 22,
    username: 'amax',
    password: '',
  });
