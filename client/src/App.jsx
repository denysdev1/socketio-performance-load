import { useEffect, useState } from 'react';
import socket from './utilities/socketConnection';
import Widget from './perfDataComponents/Widget';

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on('perfData', (data) => {
      const copyPerfData = { ...performanceData };
      copyPerfData[data.macAddress] = data;

      setPerformanceData(copyPerfData);
    });
  }, []);

  const widgets = Object.values(performanceData).map((d) => (
    <Widget data={d} key={d.macAddress} />
  ));

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div className='custom-card shadow-sm'>
            {widgets}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
