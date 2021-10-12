/** テキスト入力時に仕様 */
type InputAction = {
  type: 'INPUT_TEXT',
  inputType?: string,
  maxLength?: number,
  text?: string | number | readonly string[],
}
/** 全角入力時の確定状況に仕様 */
type InputCompositionAction = {
  type: 'INPUT_COMPOSITION',
  inputComposition?: boolean,
}
/** 入力の文字をリセットで使用 */
type ResetAction = {
  type: 'RESET_TEXT',
}
/**
 * エラーチェック時に使用
 * ERROR_TEXT : 決定時のエラーチェック
 * BLUR_ERROR_TEXT : フォーカスアウト時のエラーチェック
 */
type ErrorAction = {
  type: 'ERROR_TEXT' | 'BLUR_ERROR_TEXT',
  value?: string | number | readonly string[],
  inputType?: string,
}
// type BlurErrorAction = {
//   type: 'BLUR_ERROR_TEXT',
//   value?: string | number | readonly string[],
//   inputType?: string,
// }

/**
 *
 */
type Action = InputAction | ResetAction | ErrorAction | InputCompositionAction;
let oldValue = '';

export type InputStates = {
  value?: string | number | readonly string[],
  isError?: boolean,
  inputComposition?: boolean,
} & React.InputHTMLAttributes<HTMLInputElement>;

export const MuiInputReducer = (state: InputStates, action: Action ) => {
  switch (action.type) {
    case 'INPUT_TEXT':
      const newValue = state.inputComposition ?
        String(action.text) :
        LimitInputtingValue(
          oldValue,
          action.text,
          { maxLength: action.maxLength }
        );
      oldValue = newValue;
      return {
        ...state,
        value: newValue,
      }
    case 'RESET_TEXT':
      oldValue = '';
      return {
        ...state,
        value: '',
      }
    case 'ERROR_TEXT':
      return {
        ...state,
        isError: LimitOnButtonValue(action.value, action.inputType),
      }
    case 'BLUR_ERROR_TEXT':
      return {
        ...state,
        isError: isErrorCheckBlur(action.value, action.inputType),
      }
    case 'INPUT_COMPOSITION':
      return {
        ...state,
        inputComposition: action.inputComposition,
      }
    default: return state;
  }
}

// 入力制限
type LimitOptions = {
  maxLength?: number,
}

// 入力中の制限
const LimitInputtingValue = (
  beforeValue: string,
  afterValue?: string | number | readonly string[],
  options: LimitOptions = {}
) => {
  if (!afterValue && !beforeValue) {
    return beforeValue;
  }
  let fixValue = String(afterValue);
  // 差分チェック
  const { maxLength } = options;
  // 文字数制限
  if (maxLength) {
    fixValue = limitLength(beforeValue, fixValue, maxLength);
  }
  return fixValue;
}
/**
 * 文字数の制限に合わせて入力できる範囲外を削除する
 * @param beforeValue 入力前の状態
 * @param afterValue  入力後の状態
 * @param maxLength   制限文字数
 * @returns 整形後の文字列
 */
const limitLength = (
  beforeValue: string,
  afterValue: string,
  maxLength: number,
) => {
  // 入力値が上限超えていない
  if (afterValue.length <= maxLength) {
    return afterValue;
  }
  // そもそも前の値が上限超えてたら
  if (beforeValue.length >= maxLength) {
    return beforeValue.slice(0, maxLength);
  }
  return afterValue.slice(0, maxLength);
}

/**
 * フォーカスアウトによるチェック
 * @param value テキスト
 * @param type input type
 * @returns エラーかどうか [true: エラー]
 */
const isErrorCheckBlur = (
  value?: string | number | readonly string[],
  type?: string,
) => {
  // 空値 だった場合、エラー
  if (!value || value === '') {
    return true;
  }
  const _value = String(value);

  switch(type) {
    // 半角英数字チェック
    case 'halfStr':
      return isErrorCheckHalfStr(_value);
    // 数字チェック
    case 'number':
      return isErrorCheckNumber(_value);
    // 電話番号チェック
    case 'tel':
      return isErrorCheckTel(_value);
    // 郵便番号チェック
    case 'address':
      return isErrorCheckAddress(_value);
    default: return false;
  }
}
/**
 * 半角英数字チェック
 * @param value テキスト
 * @param type input type
 * @returns エラーかどうか [true: エラー]
 */

const isErrorCheckHalfStr = (value: string): boolean => {
  return value.match(/^[A-Za-z0-9]*$/) ? false : true;
}
/**
 * 数値チェック
 * @param value テキスト
 * @param type input type
 * @returns エラーかどうか [true: エラー]
 */

const isErrorCheckNumber = (value: string): boolean => {
  return value.match(/^[+,-]?([0-9０-９]*)(\.[0-9０-９]+)?$/) ? false : true;
}
/**
 * 電話番号チェック
 * @param value テキスト
 * @param type input type
 * @returns エラーかどうか [true: エラー]
 */

const isErrorCheckTel = (value: string): boolean => {
  const telValue = value.replace(/[―.*ー.*‐.*ー.*—.*\-]/gi,'');
  return telValue.match(/^[0-9０-９]*$/) ? false : true;
}
/**
 * 住所チェック
 * @param value テキスト
 * @param type input type
 * @returns エラーかどうか [true: エラー]
 */

const isErrorCheckAddress = (value: string): boolean => {
  return value.match(/^([0-9０-９]{3}[—,ー,‐,―,ー,-][0-9０-９]{4})?$/) ? false : true;
}

/**
 * ボタン、エンターキーによるチェック
 * @param v テキスト
 * @param type input type
 * @returns エラーかどうか [true: エラー]
 */
const LimitOnButtonValue = (
  v: string | readonly string[] | number | undefined,
  type?: string,
): boolean => {
  // 空値 だった場合、エラー
  if (!v || v === '') {
    return true;
  }
  const value = String(v);
  // URL
  if (type === 'url') {
    // URL判定
    if (value.indexOf('http://') < 0 && value.indexOf('https://') < 0) {
      return true;
    }
  }
  // メールアドレス
  if (type === 'email') {
    // 半角アットマークのみ
    if (value.indexOf('@') < 0) {
      return true;
    }
    const spt = value.split('@');
    // @ が2個以上入ってるものは、メールアドレスとして認めない
    // @ の後ろに . で区切られた文字列があること
    if (spt.length > 2 || spt[1].indexOf('.') < 0) {
      return true;
    }
  }
  return false;
}
