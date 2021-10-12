type FaceAction = {
  type: 'BIG_FACE_TYPE',
  face: string,
}
type TextAction = {
  type: 'INPUT_TEXT',
  text: string,
}

type DeleteAction = {
  type: 'DELETE_TEXT',
}

type FaceCounterPlus = {
  type: 'FACE_PLUS',
  face: string,
}

type AddFaceCounter = {
  type: 'ADD_FACE_COUNTER',
  face: string,
}

type FaceCounterReset = {
  type: 'FACE_RESET',
  face: string,
}
type Page1Action = FaceAction | TextAction | DeleteAction | FaceCounterPlus | FaceCounterReset | AddFaceCounter;


export default Page1Action;