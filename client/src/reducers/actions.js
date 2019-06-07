import {GET_ALL_INFO, GET_ALL_INFO_ERROR, GET_ALL_INFO_SUCCESS} from './actionTypes'

export const fetchData = () => ({type : GET_ALL_INFO});
export const successData = data => ({type : GET_ALL_INFO_SUCCESS, data : data});
export const errorData = () => ({type : GET_ALL_INFO_ERROR});