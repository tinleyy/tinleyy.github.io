import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TimelineIcon from '@mui/icons-material/Timeline';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import GradientIcon from '@mui/icons-material/Gradient';

export default function ToggleChartButton({ chartType, handleChartTypeChange }: { chartType: string, handleChartTypeChange: any }) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={chartType}
      exclusive
      onChange={handleChartTypeChange}
      aria-label="Platform"
    >
      <ToggleButton value="line_chart"><TimelineIcon /></ToggleButton>
      <ToggleButton value="scatter_chart"><ScatterPlotIcon /></ToggleButton>
    </ToggleButtonGroup>
  );
}