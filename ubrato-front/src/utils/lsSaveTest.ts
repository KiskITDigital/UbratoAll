interface PostData {
    title: string;
    text: string;
    files: File[];
  }
  
  export const savePostDataToLocalStorage = (tenderIndex: number, postData: PostData) => {
    localStorage.setItem(`tender_${tenderIndex}_post_data`, JSON.stringify(postData));
  };
  
  export const loadPostDataFromLocalStorage = (tenderIndex: number): PostData | null => {
    const dataString = localStorage.getItem(`tender_${tenderIndex}_post_data`);
    return dataString ? JSON.parse(dataString) : null;
  };