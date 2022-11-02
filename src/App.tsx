import { useEffect } from 'react';
import './App.css';
import createMap from './utils/GoogleMapsUtils';
import LayerTwo from './pages/LayerTwo/LayerTwo';

function App() {
  useEffect(() => {
    const mapDiv = document.getElementById("map");
    if (mapDiv) {
      createMap();
    }
  }, []);

  return (
    <>
      <LayerTwo/>
      <div id="map" className="layer1"></div>
    </>
  );
}

export default App;
