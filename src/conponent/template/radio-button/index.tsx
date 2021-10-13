import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import './radio-button.scss';

const icon_on = './assets/image/radio/radio_on.svg';
const icon_off = './assets/image/radio/radio_off.svg';

export type RadioButtonProp = {
  label: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

const boolConverter = (v: any) => !(!Boolean(v) || (v === 'off') || (v === 'false'));

const RadioButton = (props: RadioButtonProp) => {
  const {onChange, onClick, checked: _checked, label, value} = props;
  // - State -
  // -- チェック状態 --
  const [checked, setChecked] = useState(false);
  // - Callback -
  // -- ボタン押下 --
  const clickHandler = useCallback((e: MouseEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (onClick) {
      onClick(e);
    }
  }, [checked]);
  // -- state 更新　--
  const changeHandler = useCallback((e) => {
    if (onChange) {
      onChange(e);
    }
  }, []);
  // - Effect -
  // -- チェック状態更新 --
  useEffect(() => {
    if ((_checked || value) !== void 0) {
      setChecked(_checked || boolConverter(value));
    }
  }, [_checked, value]);

  return (
    <div className='radio_button'>
      <label className='radio_button__body'>
        <input
          {...props}
          onClick={clickHandler}
          type='radio'
          checked={checked || boolConverter(value)}
          defaultChecked={void 0}
          onChange={changeHandler}
        />
        <div className='radio_img_wrap'>
          <img src={checked ? icon_on : icon_off} />
        </div>
        {label}
     </label>
    </div>

  );
};

export default RadioButton;