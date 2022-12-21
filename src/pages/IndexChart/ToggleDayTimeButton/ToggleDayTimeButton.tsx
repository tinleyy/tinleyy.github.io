import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
import { Box } from '@mui/material';

export default function ToggleDayTimeButton({ selected, handleChange }: { selected: string, handleChange: any }) {

  return (
    <ToggleButtonGroup
      color="primary"
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="1D">
        1D
      </ToggleButton>
      <ToggleButton value="5D">
        5D
      </ToggleButton>
      <ToggleButton value="1M">
        1M
      </ToggleButton>
      <ToggleButton value="3M">
        3M
      </ToggleButton>
      <ToggleButton value="6M">
        6M
      </ToggleButton>
      <ToggleButton value="YTD">
        YTD
      </ToggleButton>
      <ToggleButton value="1Y">
        1Y
      </ToggleButton>
      <ToggleButton value="2Y">
        2Y
      </ToggleButton>
      <ToggleButton value="5Y">
        5Y
      </ToggleButton>
      <ToggleButton value="All">
        All
      </ToggleButton>
    </ToggleButtonGroup>
  );
}