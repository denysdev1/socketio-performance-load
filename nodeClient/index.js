require('dotenv').config();

const os = require('os');
const io = require('socket.io-client');
const options = {
  auth: {
    token: 'gjdfhgdfgil4h5394o85fsdvkljxfdsjlk',
  },
};
const socket = io(process.env.SERVER_URL, options);

socket.on('connect', () => {
  const nI = os.networkInterfaces();
  let macAddress;
  for (const key in nI) {
    const isInternetFacing = !nI[key][0].internal;

    if (isInternetFacing) {
      macAddress = nI[key][0].mac + Math.floor(Math.random() * 100000);
      break;
    }
  }

  const perfDataInterval = setInterval(async () => {
    const perfData = await performanceLoadData();
    perfData.macAddress = macAddress;

    socket.emit('perfData', perfData);
  }, 1000);

  socket.on('disconnect', () => {
    clearInterval(perfDataInterval);
  });
});

const cpuAverage = () => {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((core) => {
    for (mode in core.times) {
      totalMs += core.times[mode];
    }

    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

const getCpuLoad = () =>
  new Promise((resolve, reject) => {
    const start = cpuAverage();

    setTimeout(() => {
      const end = cpuAverage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const percentOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);

      resolve(percentOfCpu);
    }, 100);
  });

const performanceLoadData = () =>
  new Promise(async (resolve, reject) => {
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;
    const osType = os.type();
    const upTime = os.uptime();
    const cpuType = cpus[0].model;
    const numCores = cpus.length;
    const cpuSpeed = cpus[0].speed;
    const cpuLoad = await getCpuLoad();

    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuType,
      numCores,
      cpuSpeed,
      cpuLoad,
    });
  });
