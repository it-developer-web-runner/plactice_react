import { HTMLAttributes,  MouseEvent, useCallback, useMemo } from "react";
import Store from "../../redux";
type FaceProps = {
  name: string,
} & HTMLAttributes<HTMLButtonElement>;
const FaceButton = ((props: FaceProps)  => {

  const {name, onClick} = props;
  const faceId = useMemo(() => {
    const index = Store.getState().page1.faceCounters.length - 1;
    Store.dispatch({
      type: 'ADD_FACE_COUNTER',
      face: name,
    });
    return index;
  }, []);
  const counter = Store.getState().page1.faceCounters[faceId];
  const count = counter ? counter.count : 0;
  const clickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    Store.dispatch({
      type: 'FACE_PLUS',
      face: name,
    });
    if (onClick) {
      onClick(e);
    }
  },[count]);
  return (
    <div>
      <button
        {...props}
        onClick={clickHandler}
      >
        {name}
      </button>
      <span> 回数 : {count}</span>
    </div>
  )
});

export default FaceButton;