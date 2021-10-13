import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import './check-box.scss';
export type CheckBoxProp = {} & React.InputHTMLAttributes<HTMLInputElement>;

const CheckBox = (props: CheckBoxProp) => {
  const {onClick, onChange, value, checked: _checked} = props;
  const [checked, setChecked] = useState(false);
  const clickHandler = useCallback((e:MouseEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (onClick) {
      onClick(e);
    }
  }, [checked]);
  const changeHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  }, []);
  useEffect(() => {
    if (_checked !== undefined) {
      setChecked(_checked);
    }
  }, [_checked])

  return (
    <div className='checkbox'>
      <label className='checkbox__body'>
        <input
          {...props}
          onClick={clickHandler}
          type='checkbox'
          checked={checked}
          defaultChecked={undefined}
          onChange={changeHandler}
        />
        <span className={checked ? 'checked_icon' : 'box_icon'} />
        {value}
      </label>
    </div>
  );
};

export default CheckBox;