import Page2Action from './page2.action';

export type Page2State = {
  text:string,
}

const initState: Page2State = {
  text: 'テスト！',
}

const Page2Reducer = (state: Page2State = initState, action: Page2Action) => {
  // return state;
  switch(action.type) {
    case 'page2':
      return {
        ...state,
        text: action.text,
      };
    default: return {...state};
  }
}


export default Page2Reducer;