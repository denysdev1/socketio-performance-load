/* eslint-disable react/prop-types */
import { useRef } from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';

const Cpu = ({ data }) => {
  const canvasEl = useRef();
  drawCircle(canvasEl.current, data.cpuLoad);

  return (
    <div className='col-lg-4 col-md-4 col-sm-12'>
      <div className='cpu'>
        <h3>CPU Load</h3>
        <div className='canvas-wrapper'>
          <canvas className='' width='200' height='200' ref={canvasEl}></canvas>
          <div className='cpu-text'>{data.cpuLoad}</div>
        </div>
      </div>
    </div>
  );
};

export default Cpu;
