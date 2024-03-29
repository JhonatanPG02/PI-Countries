import axios from 'axios'

export function getAllCountries(){
    return async function(dispatch){
        const res = await axios.get('http://localhost:3001/countries')
    return dispatch({
        type: 'GET_ALL_COUNTRIES',
        payload: res.data
    })
  }
};

export function getCountryByName(name){
    return async function(dispatch){
        const res = await axios.get(`http://localhost:3001/countries?name=${name}`)
    return dispatch({
        type: 'GET_COUNTRY_BY_NAME',
        payload: res.data
    })
  }
};

export function getDetails(id){
    return async function(dispatch){
        const res = await axios.get(`http://localhost:3001/countries/${id}`)
    return dispatch({
        type: 'GET_DETAILS',
        payload: res.data
    })
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}

export function filterByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function filterByActivity(payload){
    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

export function getAllActivities(){
    return async function(dispatch){
        const res = await axios.get('http://localhost:3001/activity')
    return dispatch({
        type: 'GET_ALL_ACTIVITIES',
        payload: res.data
    })
  }
}

export function postActivity (payload) {
    return async function(dispatch) {
        const res = await axios.post('http://localhost:3001/activity', payload);
        return res.data
    }
}

