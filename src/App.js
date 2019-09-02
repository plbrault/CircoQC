import React, { useEffect, useState } from 'react';
import './App.css';

import getRiding from './getRiding';

const App = () => {
  const [geolocationSupported, setGeolocationSupported] = useState(true);
  const [geolocationResult, setGeolocationResult] = useState({ status: 'PENDING' });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        setGeolocationResult({ status: 'OK', location })
      }, (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setGeolocationResult({ status: 'DENIED' });
        } else {
          setGeolocationResult({ status: 'error' });
        }
      });
    } else {
      setGeolocationSupported(false);
    }
  }, [geolocationSupported]);

  if (!geolocationSupported) {
    return <div>{'La géolocalisation n\'est pas supportée sur ce navigateur.'}</div>;
  }

  return (
    <div>
      {
        {
          PENDING: 'PENDING',
          DENIED: 'DENIED',
          ERROR: 'ERROR',
          OK: 'OK',
        }[geolocationResult.status]
      }
    </div>
  );
};

export default App;
