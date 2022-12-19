import { useEffect, useState } from 'react';
import './App.css';
import LayerTwo from './pages/LayerTwo/LayerTwo';
import { createMap } from './utils/GoogleMapsUtils';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [mapStorage, setMapStorage] = useState<any>();

  useEffect(() => {
    if (mapStorage) {
      setLoaded(true);
    } else if (!loaded) {
      const mapDiv = document.getElementById("map");
      if (mapDiv) {
        const map = createMap();
        setMapStorage(map);
      }
    }
  }, [mapStorage, loaded]);

  return (
    <>
      <LayerTwo mapStorage={mapStorage} />
      <div id="map" className="layer1"></div>
    </>
  );
}

export default App;
