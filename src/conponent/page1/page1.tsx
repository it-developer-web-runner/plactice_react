import { ChangeEvent, createContext, InputHTMLAttributes, MouseEvent, useCallback, useContext, useReducer, useState,  } from 'react';
import Store from '../../redux';
import FaceButton from '../face-button/face.button';

type Page1Props = {} & InputHTMLAttributes<HTMLInputElement>;

const Page1 = (props: Page1Props) => {
  const {onChange} = props;
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    Store.dispatch({
      type: "INPUT_TEXT",
      text: e.target.value
    })
    if (onChange) {
      onChange(e);
    }
  }, [onChange]);

  const faceStrings = [
    "(´・ω・｀)",
    "(・3・)アルェー？",
    "(・ω・)bｸﾞｯ！",
  ];
  const deleteHandler = useCallback((e)=> {
    Store.dispatch({
      type: "DELETE_TEXT",
    })
  }, []);
  return (
    <>
        <h1>
          表情 : {Store.getState().page1.face}
        </h1>
        {...faceStrings.map((face, i)=> {
          const clickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
            // setState(face);
            Store.dispatch({
              type: "BIG_FACE_TYPE",
              face
            })
          }, []);
          return (
            <FaceButton key={`face_${i}`} name={face} onClick={clickHandler} />
          )
        })}
        <input
          placeholder='テキストを入力'
          type='text'
          onChange={changeHandler}
          value={Store.getState().page1.text}
        />
        <button onClick={deleteHandler}>
          削除
        </button>
        <div>
          --------------------------------------------------------------
        </div>
        <div>
          {Store.getState().page1.text}
        </div>
    </>
  )
}

export default Page1;