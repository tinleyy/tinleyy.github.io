import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';

export default function ToggleMoreButton() {
  const [alignment, setAlignment] = React.useState('');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="math"
    >
      <ToggleButton value="sigma">+2 SIGMA</ToggleButton>
      <ToggleButton value="normal_distribution">N(μ,σ)</ToggleButton>
    </ToggleButtonGroup>
  );
}