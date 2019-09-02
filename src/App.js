import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react';

import logo from './logo.svg';

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
    <div className="container">
      <img id="logo" src={logo} alt="Fleur de lys" />
      <h1>Vous êtes dans la circonscription:</h1>
      {
        {
          PENDING: 'En attente...',
          DENIED: 'Votre circonscription n\'a pas pu être obtenue car vous avez refusé de partager votre localisation.',
          ERROR: 'Une erreur est survenue.',
          OK: <div id="riding">{riding}</div>,
        }[geolocationResult.status]
      }
      <footer>
        <a href="https://github.com/plbrault/circoqc">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </footer>
    </div>
  );
};

export default App;
