import { useEffect, useState } from 'react';
import './App.css';
import { getAllIndexes } from './service/indexes';
import { IndexesResponse } from './service/indexes/types';

function App() {
  const [indexes, setIndexes] = useState<IndexesResponse[]>([]);

  const fetchAllIndexes = async () => {
    const data = await getAllIndexes();
    setIndexes(data);
  };

  useEffect(() => {
    fetchAllIndexes();
  }, []);

  return (
    <div>
      <ul>
        {indexes.map(index=> (
          <li key={index.id}>{index.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
