import { FETCHING_DATA, FETCHING_DATA_FAILURE, FETCHING_DATA_SUCCESS } from '../constants';
import loadData from './api'


export const setStageToSuccess = (data) => ({
    type: FETCHING_DATA_SUCCESS,
    payload: data
})

export const setStageToFetching = (data) => ({
    type: FETCHING_DATA
})

export const setStageToFailure = (data) => ({
    type: FETCHING_DATA_FAILURE
})

export const fetchData = () => {
    return (dispatch) => {
        dispatch(setStageToFetching())
        loadData()
            .then(result => {
                dispatch(setStageToSuccess(result))
            })
            .catch(error => {
                dispatch(setStageToFailure())
            })
    }
}
