/* eslint-disable react/prop-types */
import Cpu from './Cpu';
import Info from './Info';
import Mem from './Mem';
import socket from '../utilities/socketConnection';
import './widget.css';
import { useEffect, useState } from 'react';

const Widget = ({ data }) => {
  const [isAlive, setIsAlive] = useState(true);
  const {
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
    macAddress,
  } = data;

  const cpuData = { cpuLoad };
  const memData = { memUsage, usedMem, freeMem, totalMem };
  const infoData = { osType, upTime, macAddress, cpuType, cpuSpeed, numCores };
  const notAliveDiv = !isAlive ? (
    <div className='not-active'>Offline</div>
  ) : null;

  useEffect(() => {
    socket.on('connectedOrNot', ({ isAlive, machineMacAddress }) => {
      if (machineMacAddress === macAddress) {
        setIsAlive(isAlive);
      }
    });
  }, []);

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='row'>
          {notAliveDiv}
          <Cpu data={cpuData} />
          <Mem data={memData} />
          <Info data={infoData} />
        </div>
      </div>
    </div>
  );
};

export default Widget;
