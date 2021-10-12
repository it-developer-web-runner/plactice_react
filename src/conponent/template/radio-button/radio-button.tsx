import React, { MouseEvent, useCallback, useEffect, useState } from "react";

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
  const ClickHandler = useCallback((e: MouseEvent<HTMLInputElement>) => {
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
    <div
      onClick={ClickHandler}
    >
      <input
        {...props}
        type="radio"
        checked={checked || boolConverter(value)}
        defaultChecked={void 0}
        onChange={changeHandler}
      />
      {label}
    </div>
  );
};

export default RadioButton;