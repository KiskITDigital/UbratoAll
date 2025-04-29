import { tenderList } from "@/types/app";
import { create } from "zustand";

interface tenderListState {
    locationId: number | null
    objectTypesId: number[]
    servicesTypesId: number[]
    fastFilterTexts: string[]
    userID: number | null

    tenderList: tenderList[]

    handleLocation: (newLocationId: number | null) => void
    handleObjectTypesId: (newObjectTypesId: number[]) => void
    handleServicesTypesId: (newServicesTypesId: number[]) => void
    handleFastFilterTexts: (newFastFilterTexts: string[]) => void
    handleUserID: (newUserID: number | null) => void

    handleTenderList: (newExecutorList: tenderList[]) => void
}

export const useTenderListState = create<tenderListState>()((set) => ({
    locationId: null,
    objectTypesId: [],
    servicesTypesId: [],
    fastFilterTexts: [],
    userID: null,
    
    tenderList: [],

    handleLocation: (newLocationId: number | null) => {
        set((state) => ({ ...state, locationId: newLocationId }))
    },
    handleObjectTypesId: (newObjectTypesId: number[]) => {
        set((state) => ({ ...state, objectTypesId: newObjectTypesId }))
    },
    handleServicesTypesId: (newServicesTypesId: number[]) => {
        set((state) => ({ ...state, servicesTypesId: newServicesTypesId }))
    },
    handleFastFilterTexts: (newFastFilterTexts: string[]) => {
        set((state) => ({ ...state, fastFilterTexts: newFastFilterTexts }))
    },
    handleUserID: (newUserID: number | null) => {
        set((state) => ({ ...state, userID: newUserID }))
    },

    handleTenderList: (newTenderList: tenderList[]) => {
        set((state) => ({ ...state, tenderList: newTenderList }))
    }
}))