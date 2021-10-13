import React, { useCallback, useRef, useState } from "react";
import { MUI_FILE_UPLOADER_SELECTING_DOWN_FINE, MUI_FILE_UPLOADER_SELECTING_UP_FINE, MUI_FILE_UPLOADER_CLICK_FINE } from "./file-uploader-error-words";
import './file-uploader.scss'

export type FileUploaderProps = {
  // アップしたファイル情報を取得するための関数
  onGetValue?: (value:File[]) => void,
} & React.InputHTMLAttributes<HTMLInputElement>;

const FileUploader = (props: FileUploaderProps) =>{
  const {multiple, onGetValue, onDrop, onChange} = props;
  const inputEle = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState(new Array<File>());
  const onDragOver = useCallback((e:React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const uploadFile = (fileList: FileList) => {
    if (inputEle.current?.files) {
      const newFiles = fileList;
      inputEle.current.files = newFiles;
      const fileArr: Array<File> = [];
      for (let i=0; i <newFiles.length;i++){
        if (!multiple && i > 0) break;
        fileArr.push(newFiles[i]);
      }
      return fileArr;
    }
    return [];
  }
  // ドラッグアンドドロップによるアップロード
  const dropHandler = useCallback((e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newFiles = uploadFile(e.dataTransfer.files);
    if (onGetValue) {
      onGetValue(newFiles)
    }
    setFiles(newFiles);
    if (onDrop) {
      onDrop(e);
    }
  }, [files])
  // クリックによるアップロード
  const changeHandler = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const newFiles = uploadFile(e.target.files);
      if (onGetValue) {
        onGetValue(newFiles)
      }
      setFiles(newFiles);
    }
    if (onChange) {
      onChange(e);
    }
  }, [files])

  return (
    <div className='root' onDrop={dropHandler} onDragOver={onDragOver}>
      <label>
        <div>{MUI_FILE_UPLOADER_SELECTING_UP_FINE}</div>
        <div>{MUI_FILE_UPLOADER_SELECTING_DOWN_FINE}</div>
        <div>{MUI_FILE_UPLOADER_CLICK_FINE}</div>
        <input
          {...props}
          type="file"
          multiple={multiple}
          ref={inputEle}
          onChange={changeHandler}
        />
        {files.length > 0 ?
          files.map((file, i) => (
            <div key={`${file.name}_${i}`}>{file.name}</div>
          )): (<></>)
        }
      </label>
    </div>
  );
};


export default FileUploader;