import React, { useEffect, useState } from 'react';
import './App.css';

import getRiding from './getRiding';

const App = () => {
  const [geolocationSupported, setGeolocationSupported] = useState(true);
  const [geolocationResult, setGeolocationResult] = useState({ status: 'PENDING' });
  const [riding, setRiding] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lon } }) => {
        setGeolocationResult({ status: 'OK', lat, lon });
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

  if (!riding && geolocationResult.status === 'OK') {
    setRiding(getRiding(geolocationResult.lat, geolocationResult.lon) || 'INCONNUE');
  }

  return (
    <div>
      <h1>Votre circonscription</h1>
      {
        {
          PENDING: 'En attente...',
          DENIED: 'Votre circonscription n\'a pas pu être obtenue car vous avez refusé de partager votre localisation.',
          ERROR: 'Une erreur est survenue.',
          OK: riding,
        }[geolocationResult.status]
      }
    </div>
  );
};

export default App;
