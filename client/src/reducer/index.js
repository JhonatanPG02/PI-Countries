import {
    GET_ALL_COUNTRIES,
    GET_COUNTRY_BY_NAME,
    GET_DETAILS,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    GET_ALL_ACTIVITIES 
} from '../actions'



const initialState = {
    countries:  [],
    allCountries: [],
    activities: [],
    details:[] 
}

export default function rootReducer(state=initialState, action) {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload,
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload,
            }
        case ORDER_BY_NAME:
            const orderName = action.payload === 'asc Name'
            ? state.countries.sort((a, b) => a.name > b.name ? 1 : -1)
            : state.countries.sort((a, b) => a.name < b.name ? 1 : -1)
            
            return {
                ...state,
                countries: orderName
            }
        case ORDER_BY_POPULATION:
            const orderPopulation = action.payload === 'asc Population'
            ? state.countries.sort((a, b) => a.population > b.population ? 1 : -1)
            : state.countries.sort((a, b) => a.population < b.population ? 1 : -1)
            
            return {
                ...state,
                countries: orderPopulation
            }
        case FILTER_BY_CONTINENT:
            //Renderiza en base a los filtros, pero toma como base la copia del total.
            const allCountries = state.allCountries
            const filterContinent = action.payload === 'All Continents' 
            ? allCountries 
            : allCountries.filter(elem => elem.continent === action.payload)
            return {
                ...state,
                countries: filterContinent
            }
        case FILTER_BY_ACTIVITY:
            const allActivities= state.allCountries
                const filterActivity = action.payload === "All Activities" ? allActivities.filter( elem => elem.activities.length > 0)
                : allActivities.filter(elem => elem.activities && elem.activities.map(elem => elem.name).includes(action.payload))
            return {
                ...state,
                countries: filterActivity
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        default: return state
    }
}









