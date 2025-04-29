import { executorList } from "@/types/app";
import { create } from "zustand";

interface findExecutor {
    locationId: number | null
    objectTypesId: number[]
    servicesTypesId: number[]
    fastFilterTexts: string[]
    userID: number | null

    executorList: executorList[]

    handleLocation: (newLocationId: number | null) => void
    handleObjectTypesId: (newObjectTypesId: number[]) => void
    handleServicesTypesId: (newServicesTypesId: number[]) => void
    handleFastFilterTexts: (newFastFilterTexts: string[]) => void
    handleUserID: (newUserID: number | null) => void

    handleExecutorList: (newExecutorList: executorList[]) => void
}

export const useFindExecutorState = create<findExecutor>()((set) => ({
    locationId: null,
    objectTypesId: [],
    servicesTypesId: [],
    fastFilterTexts: [],
    userID: null,

    executorList: [],

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

    handleExecutorList: (newExecutorList: executorList[]) => {
        set((state) => ({ ...state, executorList: newExecutorList }))
    }
}))