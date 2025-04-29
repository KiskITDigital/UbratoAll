import { create } from 'zustand';
import { CleaningTypeT } from '@/types/app';
import { axiosInstance } from '@/utils';

type cleaningTypeT = {
  id: number;
  name: string;
  types: [
    {
      id: number;
      name: string;
      count: number;
    }
  ];
};

type apiCleaningTypeT = cleaningTypeT[];

interface CleaningTypeState {
  types: CleaningTypeT[];
  handleActive: (ix: number) => void;
  apiCleaningTypes: apiCleaningTypeT;
  loading: boolean;
  error: null | string;
  fetchCleaningTypes: () => Promise<void>;
}

export const useCleaningTypeStore = create<CleaningTypeState>()((set) => ({
  types: [
    {
      name: 'Генеральная уборка',
      count: -1,
      image: './general-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Регулярная уборка',
      count: -1,
      image: './regular-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Поддерживающая уборка',
      count: -1,
      image: './supporting-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Комплексная уборка',
      count: -1,
      image: './complex-cleaning.png',
      isActive: false,
      padding: 0,
    },
    {
      name: 'Уборка после ремонта',
      count: -1,
      image: './cleaning-after-renovation.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Уборка офиса',
      count: -1,
      image: './office-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Уборка ТЦ',
      count: -1,
      image: './shop-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Уборка территории',
      count: -1,
      image: './territory-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Уборка склада',
      count: -1,
      image: './warehouse-cleaning.png',
      isActive: false,
      padding: 10,
    },
  ],
  handleActive(ix) {
    set((state) => {
      state.types[ix].isActive = !state.types[ix].isActive;

      return { types: state.types };
    });
  },
  apiCleaningTypes: [],
  error: null,
  loading: false,
  fetchCleaningTypes: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/v1/tenders/services-types`);
      if (response.status !== 200) throw response;
      // console.log(response);
      set((state) => {
        state.apiCleaningTypes = response.data.groups;
        return { apiCleaningTypes: state.apiCleaningTypes };
      });
      set((state) => {
        state.types.forEach((e) => {
          state.apiCleaningTypes.forEach((o) => {
            if (o.name === 'Вывоз') {
              o.types.forEach((j) => {
                if (e.name.toUpperCase().includes(j.name.toUpperCase())) {
                  e.count = j.count;
                }
              });
            }
            o.types.forEach((j) => {
              if (j.name === e.name) {
                e.count = j.count;
              }
            });
          });
        });
        return { types: state.types };
      });
    } catch (e) {
      // console.log(e);
      // let error = e
      // // custom error
      // if (e.status === 400) {
      //   error = await e.json()
      // }
      // set({ error })
    } finally {
      set({ loading: false });
    }
  },
}));
