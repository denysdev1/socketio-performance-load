/* eslint-disable react/prop-types */
import moment from 'moment';

const Info = ({ data }) => {
  return (
    <div className='col-lg-4 col-md-4 col-sm-12'>
      <div className='cpu-info'>
        <h3>Operating System</h3>
        <div className='widget-text'>{data.osType}</div>
        <h3>Time Online</h3>
        <div className='widget-text'>
          {moment.duration(data.upTime).humanize()}
        </div>
        <h3>Processor information</h3>
        <div className='widget-text'>
          <strong>Type:</strong> {data.cpuType}
        </div>
        <div className='widget-text'>
          <strong>Number of Cores:</strong> {data.numCores}
        </div>
        <div className='widget-text'>
          <strong>Clock Speed:</strong> {data.cpuSpeed}
        </div>
      </div>
    </div>
  );
};

export default Info;
