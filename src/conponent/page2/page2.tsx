import { ChangeEvent, InputHTMLAttributes, useCallback } from "react";
import Store from "../../redux";

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
      <input onChange={changeHandler} value={Store.getState().page2.text}/>
      <div>{Store.getState().page2.text}</div>
    </>
  )
}

export default Page2;