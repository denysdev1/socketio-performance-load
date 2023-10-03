/* eslint-disable react/prop-types */
import { useRef } from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';

const Mem = ({ data }) => {
  const { freeMem, totalMem, memUsage } = data;
  const canvasEl = useRef();
  const totalMemInGB = Math.floor((totalMem / 1073741824) * 100) / 100;
  const freeMemInGB = Math.floor((freeMem / 1073741824) * 100) / 100;

  drawCircle(canvasEl.current, memUsage * 100);

  return (
    <div className='col-lg-4 col-md-4 col-sm-12'>
      <div className='mem'>
        <h3>Memory Usage</h3>
        <div className='canvas-wrapper'>
          <canvas width='200' height='200' ref={canvasEl}></canvas>
          <div className='mem-text'>{(memUsage * 100).toFixed(0)}%</div>
        </div>
        <div>Total Memory: {totalMemInGB}gb</div>
        <div>Free Memory: {freeMemInGB}gb</div>
      </div>
    </div>
  );
};

export default Mem;
