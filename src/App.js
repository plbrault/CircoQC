import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

import logo from './logo.svg';

import './App.css';

import getRiding from './getRiding';

const App = () => {
  const [geolocationSupported, setGeolocationSupported] = useState(true);
  const [geolocationResult, setGeolocationResult] = useState({ status: 'PENDING' });
  const [riding, setRiding] = useState('');

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

  if (riding === '' && geolocationResult.status === 'OK') {
    setRiding(getRiding(geolocationResult.lat, geolocationResult.lon) || 'INCONNUE');
  }

  return (
    <div className="container">
      <img id="logo" src={logo} alt="Fleur de lys" />
      <h1>Vous êtes dans la circonscription:</h1>
      {
        {
          PENDING: <FontAwesomeIcon className="spinner" icon={faSpinner} spin />,
          DENIED: 'Votre circonscription n\'a pas pu être déterminée car vous avez refusé de partager votre localisation.',
          ERROR: 'Une erreur est survenue.',
          OK: (
            <div id="riding">
              <a href={`https://fr.wikipedia.org/wiki/${riding.replace(' ', '_')}_(circonscription_provinciale)`}>
                {riding}
              </a>
            </div>
          ),
        }[geolocationResult.status]
      }
      <footer>
        <a href="https://github.com/plbrault/circoqc">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <div className="footer-text">
          Ce site utilise les&nbsp;
          <a href="https://dgeq.org">données ouvertes du DGEQ</a>
          .
        </div>
      </footer>
    </div>
  );
};

export default App;
