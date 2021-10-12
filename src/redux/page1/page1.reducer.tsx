import Page1Action from "./page1.action";
export type faceCounter = {
  face: string,
  count: number,
}

export type Page1State = {
  face: string,
  text: string,
  faceCounters: faceCounter[],
}
const initPageState: Page1State = {
  face: "",
  text: "",
  faceCounters: [],
}

const Page1Reducer = (state: Page1State = initPageState, action: Page1Action) => {
  // それぞれのタイプで何を更新するの？が書かれてる
  switch (action.type) {
    case "BIG_FACE_TYPE":
      return {
        ...state, // 更新しないものは、そのまま使うよってこと。
        face: action.face, // action に dispatch で渡した値がすべて入ってるので、更新する分は、action から取り出す
      };
    case "INPUT_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "DELETE_TEXT":
      return {
        ...state,
        text: "",
      };
    case "FACE_PLUS":
      const plusFaceIndex = state.faceCounters.findIndex(
        counter=> counter.face === action.face
      );
      const plusCounter = state.faceCounters.map((v,i) =>{return {
        face: v.face,
        count: i === plusFaceIndex ? v.count + 1 : v.count,
      }});
      return {
        ...state,
        faceCounters: plusCounter,
      };
    case "FACE_RESET":
      const resetFaceIndex = state.faceCounters.findIndex(
        counter=> counter.face === action.face
      );
      const resetCounter = state.faceCounters.map((v,i) =>{return {
        face: v.face,
        count: i === resetFaceIndex ? 0 : v.count,
      }});
      return {
        ...state,
        faceCounters: resetCounter,
      };
    case 'ADD_FACE_COUNTER':
      const findFaceIndex = state.faceCounters.findIndex(
        counter=> counter.face === action.face
      );
      if (findFaceIndex < 0) {
        const newCounter = state.faceCounters.map((v) => {
          return {...v};
        });
        newCounter.push({face: action.face, count: 0});
        return {
          ...state,
          faceCounters: newCounter,
        }
      } else {
        return { ...state };
      }
    default: return { ...state };
  }
}

export default Page1Reducer;
