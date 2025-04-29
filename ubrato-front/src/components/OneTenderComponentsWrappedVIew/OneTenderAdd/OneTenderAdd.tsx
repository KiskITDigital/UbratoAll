import { FC } from "react";
// import { useState } from 'react';



// interface PostFormProps {
//     onSubmit: (postData: PostData) => void;
//     post: PostData | null;
//   }
  
//  export interface PostData {
//     title: string;
//     text: string;
//     files: File[];
//   }
  
  export const OneTenderAdd: FC = (
    // { onSubmit, }
  ) => {
    // const [title, setTitle] = useState<string>('');
    // const [text, setText] = useState<string>('');
    // const [files, setFiles] = useState<File[]>([]);
  
    // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   setTitle(e.target.value);
    // };
  
    // const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   setText(e.target.value);
    // };
  
    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const fileList = e.target.files;
    //   if (fileList) {
    //     const fileArray = Array.from(fileList);
    //     setFiles(fileArray);
    //   }
    // };
  
    // const handleSubmit = (e: React.FormEvent) => {
    //   e.preventDefault();
    //   onSubmit({ title, text, files });
    //   setTitle('');
    //   setText('');
    //   setFiles([]);
    // };
  
    return (
      <form 
        // onSubmit={handleSubmit}
      >
        <label>
          Title:
          <input type="text" 
            // value={title}
            // onChange={handleTitleChange}
           />
        </label>
        <label>
          Text:
          <textarea
          //  value={text} 
          //  onChange={handleTextChange} 
           />
        </label>
        <label>
          Files:
          <input type="file" multiple 
          // onChange={handleFileChange}
           />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };
  