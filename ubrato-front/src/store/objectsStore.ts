import { create } from 'zustand';
import { ObjectInfoT } from '@/types/app';
import { axiosInstance } from '@/utils';

type objectT = {
  id: number;
  name: string;
  total: number;
  types: [
    {
      id: number;
      name: string;
      total: number;
    }
  ];
};

type apiObjectT = objectT[] | [];

interface ObjectsState {
  objects: ObjectInfoT[];
  apiObjects: apiObjectT;
  loading: boolean;
  error: null | string;
  handleActive: (ix: number) => void;
  fetchObjects: () => Promise<void>;
}

export const useTypesObjectsStore = create<ObjectsState>()((set) => ({
  apiObjects: [],
  loading: false,
  error: null,
  objects: [
    {
      name: 'Торговая недвижимость',
      count: -1,
      image: './commercial.svg',
      isActive: false,
    },
    {
      name: 'Офисная недвижимость',
      count: 1000,
      image: './office.svg',
      isActive: false,
    },
    {
      name: 'Транспорт',
      count: -1,
      image: './transport.svg',
      isActive: false,
    },
    {
      name: 'Производственная недвижимость',
      count: -1,
      image: './factory.svg',
      isActive: false,
    },
    {
      name: 'HoReCa',
      count: -1,
      image: './horeco.svg',
      isActive: false,
    },
    {
      name: 'Объекты здравоохранения',
      count: -1,
      image: './health.svg',
      isActive: false,
    },
    {
      name: 'Объекты образования',
      count: -1,
      image: './education.svg',
      isActive: false,
    },
    {
      name: 'Жилая недвижимость',
      count: -1,
      image: './housing.svg',
      isActive: false,
    },
    {
      name: 'Складская недвижимость',
      count: -1,
      image: './warehouse.svg',
      isActive: false,
    },
    {
      name: 'Спортивные объекты',
      count: -1,
      image: './sport.svg',
      isActive: false,
    },
    {
      name: 'Территория',
      count: -1,
      image: './territory.svg',
      isActive: false,
    },
    {
      name: 'Объекты культурного наследия',
      count: -1,
      image: './culture.svg',
      isActive: false,
    },
    {
      name: 'Транспортная инфраструктура',
      count: -1,
      image: './transport-inf.svg',
      isActive: false,
    },
    {
      name: 'Природные объекты',
      count: -1,
      image: './nature.svg',
      isActive: false,
    },
  ],
  handleActive(ix) {
    set((state) => {
      let activeIx = -1;

      state.objects.every((e, ixc) => {
        if (e.isActive) {
          activeIx = ixc;
          return false;
        }
        return true;
      });

      if (activeIx !== -1) {
        state.objects[activeIx].isActive = false;
        state.objects[ix].isActive = true;
        if (activeIx === ix) {
          state.objects[ix].isActive = false;
        }
      } else {
        state.objects[ix].isActive = true;
      }

      return { objects: state.objects };
    });
  },
  fetchObjects: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/v1/tenders/objects-types');
      if (response.status !== 200) throw response;
      // console.log(response);
      set((state) => {
        state.apiObjects = response.data.groups;
        return { apiObjects: state.apiObjects };
      });
      set((state) => {
        state.objects.forEach((e) => {
          !!state?.apiObjects?.length &&
            state.apiObjects.forEach((o) => {
              if (
                e.name === 'Спортивные объекты' &&
                o.name === 'Спортивно-оздоровительные объекты'
              ) {
                e.count = o.total;
              }
              if (e.name === 'Объекты здравоохранения' && o.name === 'Объект здравоохранения') {
                e.count = o.total;
              }
              if (e.name === o.name) {
                e.count = o.total;
              }
            });
        });
        return { objects: state.objects };
      });
    } catch (e) {
      // console.log(e);
    } finally {
      set({ loading: false });
    }
  },
}));
