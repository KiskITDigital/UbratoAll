import { fetchDocumentsTypes, fetchUserDocs, updateToken } from '@/api';
import { create } from 'zustand';

interface documentInfo {
  type: number;
  header: string;
  id: string;
  link?: string;
  idFile?: string;
}

interface profileDocumentsStore {
  documents: documentInfo[];
  fetchDocuments: () => Promise<void>;
  removeDocument: (id: string) => void
}

const documentsTypes: Record<number, string> = {
  1: 'egrul',
  2: 'company_card',
  3: 'director_order',
  4: 'company_regulation',
};

export const useProfileDocumentsStore = create<profileDocumentsStore>()((set) => ({
    
  documents: [],
  async fetchDocuments() {
    const res = await fetchDocumentsTypes();
    const userDocs = await updateToken<{ id: string; link: string; type: string }[], null>(
      fetchUserDocs,
      null
    );
    // console.log(res);
    // console.log(userDocs);


    const docsArr: documentInfo[] = []
    res.forEach((e) => {
      // const link = userDocs.find((i) => i.type === e.name)?.id
      // console.log(link);

      // if (!link) {
      //   docsArr.push({
      //     type: e.id,
      //     header: e.name,
      //     id: documentsTypes[e.id]
      //   })
      // } else {
      docsArr.push({
        type: e.id,
        header: e.name,
        id: documentsTypes[e.id],
        link: userDocs.find((i) => i.type === e.name)?.link,
        idFile: userDocs.find((i) => i.type === e.name)?.id,
      });
      // }
    })
    // console.log(docsArr);

    set({ documents: docsArr });
  },
  removeDocument(id: string) {
    // console.log(id);

    const newDocs = this.documents.map(el => el.idFile === id ? {
      type: el.type,
      header: el.header,
      id: el.id
    } : el)
    // console.log('_', newDocs);

    set({ documents: newDocs })
  }
}));
