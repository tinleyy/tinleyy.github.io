import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TimelineIcon from '@mui/icons-material/Timeline';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import GradientIcon from '@mui/icons-material/Gradient';

export default function ToggleChartButton() {
  const [alignment, setAlignment] = React.useState('line_chart');

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
      aria-label="Platform"
    >
      <ToggleButton value="line_chart"><TimelineIcon /></ToggleButton>
      <ToggleButton value="heat_map"><GradientIcon /></ToggleButton>
      <ToggleButton value="scatter_chart"><ScatterPlotIcon /></ToggleButton>
    </ToggleButtonGroup>
  );
}