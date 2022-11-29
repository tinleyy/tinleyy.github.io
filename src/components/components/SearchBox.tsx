import DirectionsIcon from '@mui/icons-material/Directions';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

export default function SearchInputBase({ onClick }: { onClick: Function}) {
  const [target, setTarget] = useState("");

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} value={target} onChange={(event) => setTarget(event.target.value)}/>
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => onClick(target)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
