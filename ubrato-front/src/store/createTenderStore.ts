import { uploadFile } from '@/api';
import { getCities } from '@/api/index';
import { City } from '@/types/app';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface createTenderState {
  executorToSend: { id: string; name: string } | null;
  errors: string[];
  name: string;
  price: string;
  is_contract_price: boolean;
  floor_space: string;
  description: string;
  wishes: string;
  attachments: {
    id: number;
    linkToSend: string;
    fileType: string;
    fileSize: number;
    fileName: string;
  }[];
  isValidating: boolean;
  services_groups: number[];
  city: string;
  is_NDS: boolean;
  objectName: string;
  objectCategory: string[];
  services: {
    id: number;
    name: string;
    total: number;
    types: { id: number; name: string; count: number }[];
  }[];
  reception_start: Date;
  reception_time_start: string;
  reception_end: Date;
  reception_time_end: string;
  work_start: Date;
  work_end: Date;
  city_id: number;
  object_group_id: number;
  object_type_id: number;
  changeExecutorToSend: (id?: string, name?: string) => void;
  changeIsValidating: (newVal: boolean) => void;
  cleaningTZ: {
    id: number;
    fileName: string;
    linkToSend: string;
    fileType: string;
    fileSize: number;
  } | null;
  handleSimpleInput: (
    whatToChange:
      | 'name'
      | 'reception_time_start'
      | 'reception_time_end'
      | 'price'
      | 'is_contract_price'
      | 'is_NDS'
      | 'description'
      | 'wishes'
      | 'floor_space'
      | 'objectName'
      | 'objectCategory'
      | 'city'
      | 'reception_start'
      | 'reception_end'
      | 'work_start'
      | 'work_end',
    newVal: string | boolean | Date,
    mask?: (value: string) => string
  ) => void;
  addObject: (newObjectName: string, newObjectTypes: string[]) => void;
  changeService: (
    serviceToChangeId: number,
    newServiceName: string,
    newServiceTypes: string[]
  ) => void;
  removeObjectType: (typeInd: number) => void;
  addService: (newServiceName: string, newServiceTypes: string[]) => void;
  removeService: (id: number) => void;
  removeServiceType: (serviceId: number, typeId: number) => void;
  cities: City[];
  attachmentIdToChange: number | null;
  getCities: (query: string) => void;
  addError: (newError: string) => void;
  removeError: (errorToRemove: string) => void;
  validateInputs: (isDraft: boolean) => boolean;
  handleFileUpload: (
    event: ChangeEvent<HTMLInputElement>,
    newId: number | null,
    isClaeningTZ?: 'upload-tz'
  ) => void;
  changeAttachmentText: (id: number, text: string) => void;
  removeAttachment: (id: number) => void;
  changeAttachmentIdToChange: (newVal: number | null) => void;
  removeCleaningTZ: () => void;
  clear: () => void;
}

export const useCreateTenderState = create<createTenderState>()((set) => ({
  executorToSend: null,
  isValidating: false,
  errors: [],
  cleaningTZ: null,
  name: '',
  price: '',
  is_contract_price: false,
  floor_space: '',
  description: '',
  wishes: '',
  attachments: [],
  services_groups: [],

  is_NDS: true,

  city: '',

  objectName: '',
  objectCategory: [],

  services: [],

  cities: [],

  reception_start: new Date(),
  reception_time_start: '00:00',
  reception_end: new Date(),
  reception_time_end: '00:00',

  work_start: new Date(),
  work_end: new Date(),
  city_id: 0,
  object_group_id: 0,
  object_type_id: 0,
  attachmentIdToChange: null,
  changeExecutorToSend: (id?: string, name?: string) => {
    if (!id || !name) set((state) => ({ ...state, executorToSend: null }));
    else set((state) => ({ ...state, executorToSend: { id, name } }));
  },
  handleSimpleInput: (
    whatToChange:
      | 'name'
      | 'reception_time_start'
      | 'reception_time_end'
      | 'price'
      | 'is_contract_price'
      | 'is_NDS'
      | 'description'
      | 'wishes'
      | 'floor_space'
      | 'objectName'
      | 'objectCategory'
      | 'city'
      | 'reception_start'
      | 'reception_end'
      | 'work_start'
      | 'work_end',
    newVal: string | boolean | Date,
    mask?: (value: string) => string
  ) => {
    set((state) => ({
      ...state,
      [whatToChange]: mask && typeof newVal === 'string' ? mask(newVal) : newVal,
    }));
  },
  addObject: (newObjectName: string, newObjectTypes: string[]) => {
    set((state) => ({ ...state, objectName: newObjectName, objectCategory: newObjectTypes }));
  },

  removeObjectType: (typeInd: number) => {
    set((state) => ({
      ...state,
      objectCategory: state.objectCategory.filter((_, ind) => ind !== typeInd),
    }));
  },
  addService: (newServiceName: string, newServiceTypes: string[]) => {
    set((state) => ({
      ...state,
      services: [
        ...state.services,
        {
          id: Date.now(),
          name: newServiceName,
          total: 0,
          types: newServiceTypes.map((type, ind) => ({
            id: Date.now() + ind,
            name: type,
            count: 0,
          })),
        },
      ],
    }));
    set((state) => ({ ...state, errors: state.errors.filter((error) => error !== 'services') }));
  },
  removeService: (id: number) => {
    set((state) => ({ ...state, services: state.services.filter((service) => service.id !== id) }));
  },
  changeService: (serviceToChangeId: number, newServiceName: string, newServiceTypes: string[]) => {
    set((state) => ({
      ...state,
      services: state.services.map((service) =>
        service.id === serviceToChangeId
          ? {
              id: Date.now(),
              name: newServiceName,
              total: 0,
              types: newServiceTypes.map((type, ind) => ({
                id: Date.now() + ind,
                name: type,
                count: 0,
              })),
            }
          : service
      ),
    }));
  },
  removeServiceType: (serviceId: number, typeId: number) => {
    set((state) => {
      const serviceToFind = state.services.find(
        (service: {
          id: number;
          name: string;
          total: number;
          types: { id: number; name: string; count: number }[];
        }) => service.id === serviceId
      );
      if (serviceToFind!.types.length <= 1) {
        const newState = state;
        newState.services = newState.services.filter((service) => service.id !== serviceId);
        return { ...state, services: newState.services };
      } else {
        return {
          ...state,
          services: state.services.map((service) =>
            service.id === serviceId
              ? { ...service, types: service.types.filter((type) => type.id !== typeId) }
              : service
          ),
        };
      }
    });
  },

  getCities: async (query: string) => {
    const newSities = query ? (await getCities(query)).data : [];
    set((state) => ({ ...state, cities: newSities ?? [] }));
  },

  addError: (newError: string) => {
    set((state) => ({ ...state, errors: [...state.errors, newError] }));
  },

  removeError: (errorToRemove: string) => {
    set((state) => ({
      ...state,
      errors: [...state.errors.filter((error) => error !== errorToRemove)],
    }));
  },

  handleFileUpload: async (
    event: ChangeEvent<HTMLInputElement>,
    idToChange: number | null,
    isClaeningTZ?: 'upload-tz'
  ) => {
    const files = event.target.files;
    const file = files![files!.length - 1];

    let newFile:
      | { id: number; fileName: string; linkToSend: string; fileType: string; fileSize: number }
      | undefined;
    const token = localStorage.getItem('token');
    const parameters = {
      file,
      private: false,
    };
    if (token) {
      try {
        const link = await uploadFile(token, parameters);
        const fileType = file.type.split('/')[0];
        const fileName = link.slice(link.lastIndexOf('/') + 1);
        if (fileType === 'image' || file.type === 'application/pdf' || file.type === 'text/xml') {
          newFile = {
            id: idToChange || Date.now(),
            fileName,
            linkToSend: `https://cdn.ubrato.ru/s3${link?.replace('/files', '')}`,
            fileType,
            fileSize: file.size,
          };
          if (isClaeningTZ) {
            if (isClaeningTZ === 'upload-tz') {
              set((state) => ({ ...state, cleaningTZ: newFile }));
            } else {
              set((state) => ({ ...state, cleaningTZ: null }));
            }
            return;
          }
          if (idToChange) {
            set((state) => ({
              ...state,
              attachments: state.attachments.map((attachment) =>
                attachment.id === idToChange ? newFile! : attachment
              ),
            }));
          } else {
            set((state) => ({
              ...state,
              attachments: [...state.attachments, newFile!],
              errors: state.errors.filter((error) => error !== 'attachments'),
            }));
          }
        }
      } catch (e) {
        console.error('sending file err: ', e);
      }
    }
  },
  removeCleaningTZ: () => {
    set((state) => ({ ...state, cleaningTZ: null }));
  },
  changeIsValidating: (newVal: boolean) => {
    set((state) => ({ ...state, isValidating: newVal }));
  },
  validateInputs: (isDraft: boolean) => {
    const newErrors: string[] = [];
    set((state) => {
      let new_is_contract_price = state.is_contract_price;
      if (!state.name) newErrors.push('name');
      if (!isDraft) {
        // if (!state.price) newErrors.push('price')
        if (!state.price) new_is_contract_price = true;
        // if (!state.cleaningTZ) newErrors.push('tz')
        if (!state.city) newErrors.push('city');
        if (!state.objectName) newErrors.push('object');
        // if (!state.floor_space) newErrors.push('floor_space')
        if (!state.services.length) newErrors.push('services');
        // if (!state.description) newErrors.push('description')
        // if (!state.wishes) newErrors.push('wishes')
        // if (!state.attachments.length) newErrors.push('attachments')
      }
      return {
        ...state,
        errors: [...newErrors],
        isValidating: true,
        is_contract_price: new_is_contract_price,
      };
    });
    return !!newErrors.length;
  },

  changeAttachmentIdToChange: (newVal: number | null) => {
    set((state) => ({ ...state, attachmentIdToChange: newVal }));
  },

  changeAttachmentText: (id: number, newText: string) => {
    set((state) => ({
      ...state,
      attachments: state.attachments.map((attachment) =>
        attachment.id === id ? { ...attachment, text: newText } : attachment
      ),
    }));
  },
  removeAttachment: (id: number) => {
    set((state) => ({
      ...state,
      attachments: state.attachments.filter((attachment) => attachment.id !== id),
    }));
  },

  clear: () => {
    set(() => ({
      name: '',
      price: '',
      is_contract_price: false,
      floor_space: '',
      description: '',
      wishes: '',
      attachments: [],
      services_groups: [],
      cleaningTZ: null,

      is_NDS: true,

      city: '',

      objectName: '',
      objectCategory: [],

      services: [],

      cities: [],

      reception_start: new Date(),
      reception_time_start: '',
      reception_end: new Date(),
      reception_time_end: '',

      work_start: new Date(),
      work_end: new Date(),
      city_id: 0,
      object_group_id: 0,
      object_type_id: 0,
    }));
  },
}));
