import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

export default function SelectCheckBox({ label, checked, handleOnChange }: { label: string, checked: boolean, handleOnChange: any }) {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked checked={checked} onChange={handleOnChange} />} label={label} />
    </FormGroup>
  );
}