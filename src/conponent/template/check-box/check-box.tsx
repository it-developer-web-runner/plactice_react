import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";

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
    <div onClick={clickHandler}>
      <input
        {...props}
        type='checkbox'
        checked={checked}
        defaultChecked={undefined}
        onChange={changeHandler}
      />
      {value}
    </div>
  );
};

export default CheckBox;