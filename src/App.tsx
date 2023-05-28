import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import list from './service/example-set-list.json';
import MultiSelector from './components/multi-selector';

function App() {
  const [update, setUpdate] = useState(false);
  const [selectedText, setSelectedText] = useState<any>([]);
  const handleSelectText = (text: string) => {
    let t = selectedText;
    t.push(text);
    setSelectedText(t);
    setUpdate(!update);
  }
  const handleRandomChangeText = () => {
    setCenterText(list[Math.floor(Math.random() * total)].chi);
    setCenterTopText(list[Math.floor(Math.random() * total)].chi);
    setCenterBottomText(list[Math.floor(Math.random() * total)].chi);
    setText3(list[Math.floor(Math.random() * total)].chi);
    setText4(list[Math.floor(Math.random() * total)].chi);
    setText5(list[Math.floor(Math.random() * total)].chi);
    setText6(list[Math.floor(Math.random() * total)].chi);
    setText7(list[Math.floor(Math.random() * total)].chi);
    setText8(list[Math.floor(Math.random() * total)].chi);
    setText9(list[Math.floor(Math.random() * total)].chi);
    setText10(list[Math.floor(Math.random() * total)].chi);
    setText11(list[Math.floor(Math.random() * total)].chi);
    setText12(list[Math.floor(Math.random() * total)].chi);
    setText13(list[Math.floor(Math.random() * total)].chi);
  }

  useEffect(() => {
  }, [update]);

  const [total, setTotal] = useState(18);
  const [centerText, setCenterText] = useState(list[Math.floor(Math.random() * total)].chi);
  const [centerTopText, setCenterTopText] = useState(list[Math.floor(Math.random() * total)].chi);
  const [centerBottomText, setCenterBottomText] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text3, setText3] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text4, setText4] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text5, setText5] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text6, setText6] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text7, setText7] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text8, setText8] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text9, setText9] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text10, setText10] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text11, setText11] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text12, setText12] = useState(list[Math.floor(Math.random() * total)].chi);
  const [text13, setText13] = useState(list[Math.floor(Math.random() * total)].chi);

  return (
    <div id='background'>
      <div id='lan-bg'>
        <Button variant="text" className='lan' onClick={() => handleRandomChangeText()}>Reload</Button>
        <Button variant="text" className='lan'>繁</Button>
        <Button variant="text" className='lan'>英</Button>
        Total {list.length} words
        <MultiSelector/>
      </div>

      <p id='center-text' className='default' onClick={() => handleSelectText(centerText)}>{centerText}</p>
      <p id='center-top-text' className='default second' onClick={() => handleSelectText(centerTopText)}>{centerTopText}</p>
      <p id='center-bottom-text' className='default second' onClick={() => handleSelectText(centerBottomText)}>{centerBottomText}</p>
      <p id='text-3' className='default second' onClick={() => handleSelectText(text3)}>{text3}</p>
      <p id='text-4' className='default second' onClick={() => handleSelectText(text4)}>{text4}</p>
      <p id='text-5' className='default second' onClick={() => handleSelectText(text5)}>{text5}</p>
      <p id='text-6' className='default second' onClick={() => handleSelectText(text6)}>{text6}</p>
      <p id='text-7' className='default second' onClick={() => handleSelectText(text7)}>{text7}</p>
      <p id='text-8' className='default second' onClick={() => handleSelectText(text8)}>{text8}</p>
      <p id='text-9' className='default second' onClick={() => handleSelectText(text9)}>{text9}</p>
      <p id='text-10' className='default second' onClick={() => handleSelectText(text10)}>{text10}</p>
      <p id='text-11' className='default second' onClick={() => handleSelectText(text11)}>{text11}</p>
      <p id='text-12' className='default second' onClick={() => handleSelectText(text12)}>{text12}</p>
      <p id='text-13' className='default second' onClick={() => handleSelectText(text13)}>{text13}</p>

      {
        selectedText.map((t: string, index: number) => <span>&nbsp;{t}+</span>)
      }
    </div>
  );
}

export default App;
