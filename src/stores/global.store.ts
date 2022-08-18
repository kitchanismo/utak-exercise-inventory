import { createAction, createReducer } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationReducers } from '.'

export interface IGlobalStore {
  isLoading: boolean
}
export const setLoading = createAction<boolean>('SET_ISLOADING')
export const toggleLoading = createAction('TOGGLE_ISLOADING')

const state: IGlobalStore = {
  isLoading: false,
}

const globalStore = createReducer(state, (builder) => {
  builder.addCase(setLoading, (state, action) => ({
    ...state,
    isLoading: action.payload,
  }))
  builder.addCase(toggleLoading, (state, action) => ({
    ...state,
    isLoading: !state?.isLoading,
  }))
})

export const useGlobalStore = () => {
  const globalState = useSelector(
    (state: ApplicationReducers) => state?.globalStore
  )

  const dispatch = useDispatch()

  const setLoadingState = (isLoading: boolean) =>
    dispatch(setLoading(isLoading))

  const toggleLoadingState = () => dispatch(toggleLoading())

  return {
    globalState,
    setLoadingState,
    toggleLoadingState,
  }
}

export default globalStore
