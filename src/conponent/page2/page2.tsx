import { ChangeEvent, InputHTMLAttributes, useCallback } from "react";
import Store from "../../redux";
import CheckBox from "../template/check-box";
import RadioButton from "../template/radio-button";

type Page2Props = {} & InputHTMLAttributes<HTMLInputElement>;

const Page2 = (props: Page2Props) => {
  const {onChange} = props;
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    Store.dispatch({
      type: 'page2',
      text: e.target.value,
    });
    if (onChange) {
      onChange(e);
    }
  }, [onChange]);
  return (
    <>
      <div className='radio_wrap'>
        <RadioButton label='テスト1'/>
        <RadioButton label='テスト2'/>
        <RadioButton label='テスト3'/>
      </div>
      <div className='checkbox_wrap'>
        <CheckBox value="チェックボックス1"/>
        <CheckBox value="チェックボックス2"/>
        <CheckBox value="チェックボックス3"/>
      </div>
      <input onChange={changeHandler} value={Store.getState().page2.text}/>
      <div>{Store.getState().page2.text}</div>
    </>
  )
}

export default Page2;