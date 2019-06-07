import {GET_ALL_INFO, GET_ALL_INFO_ERROR, GET_ALL_INFO_SUCCESS} from './actionTypes'

const initialState = {
    error : false,
    loading : false,
    launches : [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_INFO : 
            return {...state, loading : true};
        case GET_ALL_INFO_SUCCESS :
            return {...state, launches : action.data, loading : false};
        case GET_ALL_INFO_ERROR :
            return {...state, loading : false, error : true}
        default : return state
    }
}