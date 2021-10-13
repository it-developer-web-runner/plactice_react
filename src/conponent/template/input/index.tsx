import React, { useEffect, useReducer, useRef, useState, useMemo, useCallback } from 'react';
import {
  MUI_INPUT_ERROR_MAIL,
  MUI_INPUT_ERROR_NOT_ADDRESS_VALUE,
  MUI_INPUT_ERROR_NOT_HALF_STRING_VALUE,
  MUI_INPUT_ERROR_NOT_NUMBER_VALUE,
  MUI_INPUT_ERROR_NOT_TEL_VALUE,
  MUI_INPUT_ERROR_NO_VALUE,
  MUI_INPUT_ERROR_URL,
} from './input-error-words';
import { MuiInputReducer, InputStates } from './input.reducer';
import './input.scss';

export type InputProps = {
  isError?: boolean,
  inputComposition?: boolean,
  typeErrorWords?: { [key in string]: string }
  label?: { text: string, motion?: boolean, required?: boolean }
  // 値をデリートした時に実行する Callback
  onDelete?: (value?: string | number | readonly string[]) => void,
  // 入力された文字列を 呼び出し元で値を受け取るためのCallback Enterキー、Blur で発火
  onGetValue?: (value?: string | number | readonly string[]) => void,
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 *
 * @param type 従来の input の type と追加有り、非推奨有り
 *  @追加   halfStr: 半角英数字のみ
 *  @追加   address: 半角英数字のみ
 *  @独自   tel    : 電話番号の形式のみ
 *  @独自   number : 数字のみ
 *  @非推奨 checkBox, RadioButton, ComboBox, Switch, Button
 * @param multiple
 * @param maxLength
 * @param isError
 * @param typeErrorWords
 */
export const Input = (props: InputProps) => {
  const {
    onCompositionStart,
    onCompositionEnd,
    onBlur,
    onKeyDown,
    maxLength,
    type,
    isError,
    typeErrorWords,
    label,
    value,
    onDelete,
    onGetValue,
    ...defaultProps
  } = props;
  const defaultType = type; // <input> の type

  const init: InputStates = {
    value: value,
    isError: isError,
    inputComposition: false,
  }
  const [inputState, dispatch] = useReducer(MuiInputReducer, init);
  const errorComponent = getError(
    inputState.value,
    inputState.isError,
    type,
    typeErrorWords,
  );

  /* ref */
  const inputWrapEle = useRef<HTMLDivElement>(null)
  const inputEle = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value !== undefined) {
      dispatch({
        type: 'INPUT_TEXT',
        maxLength,
        inputType: type,
        text: value
      });
    }
  }, [value]);

  const keyDownHandler = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case "Enter":
        e.preventDefault()
        dispatch({
          type: 'ERROR_TEXT',
          inputType: type,
          value: inputState.value
        });
        if (onGetValue) {
          onGetValue(inputState.value)
        }
        break;
      default: break;
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }, [inputState]);

  const blurHandler = useCallback((e) => {
    dispatch({
      type: 'INPUT_COMPOSITION',
      inputComposition: false,
    });
    dispatch({
      type: 'BLUR_ERROR_TEXT',
      inputType: type,
      value: inputState.value
    })
    if (onGetValue) {
      onGetValue(inputState.value)
    }
    if (onBlur) {
      onBlur(e);
    }
  }, [inputState]);

  const compositionStartHandler = useCallback((e) => {
    dispatch({
      type: 'INPUT_COMPOSITION',
      inputComposition: true,
    });
    if (onCompositionStart) {
      onCompositionStart(e);
    }
  }, [inputState]);
  const compositionEndHandler = useCallback((e) => {
    dispatch({
      type: 'INPUT_COMPOSITION',
      inputComposition: false,
    });
    dispatch({
      type: 'INPUT_TEXT',
      maxLength,
      inputType: type,
      text: inputState.value
    });
    if (onCompositionEnd) {
      onCompositionEnd(e);
    }
  }, [inputState]);

  const _type = (() => {
    switch (type) {
      case 'halfStr':
      case 'number':
      case 'address':
      case 'tel':
        return 'text';
      default: return type;
    }
  })();

  return (
    <>
      <input
        {...defaultProps}
        value={inputState.value}
        onChange={(e) => dispatch({
          type: 'INPUT_TEXT',
          maxLength,
          inputType: type,
          text: e.target.value
        })}
        onKeyDown={keyDownHandler}
        onCompositionStart={compositionStartHandler}
        onCompositionEnd={compositionEndHandler}
        onBlur={blurHandler}
        type={_type}
        ref={inputEle}
        className="mui_input__body__form"
      />
      {/* エラーメッセージ */}
      {inputState.isError ? errorComponent : <></>}
    </>
  );
}
const getError = (
  value?: string | readonly string[] | number | undefined,
  isError?: boolean,
  type?: string,
  typeErrorWords?: { [key in string]: string }
) => {
  if (isError && !value) {
    return getErrorComponent(false, type, typeErrorWords)
  }
  return getErrorComponent(true, type);
}
// type属性によって表示するエラーの出し分け
const getErrorComponent = (
  isValue: boolean = true,
  type?: string,
  typeErrorWords?: { [key in string]: string }
) => {
  let word = '';
  if (!isValue) {
    word = `${(type !== void 0 ? typeErrorWords?.[type] : '') || ''}${MUI_INPUT_ERROR_NO_VALUE}`
  } else {
    switch (type) {
      case 'noneValue':
        word = MUI_INPUT_ERROR_MAIL;
        break;
      case 'email':
        word = MUI_INPUT_ERROR_MAIL;
        break;
      case 'url':
        word = MUI_INPUT_ERROR_URL;
        break;
      case 'halfStr':
        word = MUI_INPUT_ERROR_NOT_HALF_STRING_VALUE;
        break;
      case 'number':
        word = MUI_INPUT_ERROR_NOT_NUMBER_VALUE;
        break;
      case 'tel':
        word = MUI_INPUT_ERROR_NOT_TEL_VALUE;
        break;
      case 'address':
        word = MUI_INPUT_ERROR_NOT_ADDRESS_VALUE;
        break;
      default: return <></>;
    }
  }
  return <div className={`ErrorWord`}>{word}</div>
}