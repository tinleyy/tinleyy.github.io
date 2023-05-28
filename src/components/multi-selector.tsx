import Select from 'react-select';

const options = [
    { value: '功能', label: '功能' },
    { value: '概念', label: '概念' },
    { value: '形狀', label: '形狀' },
    { value: '質料', label: '質料' }
  ]
  
export default () => (
  <Select
    defaultValue={[options[0], options[1], options[2], options[3]]}
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);