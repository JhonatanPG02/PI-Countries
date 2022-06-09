import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCountries,
        getAllActivities,
        orderByName,
        orderByPopulation,
        filterByContinent,
        filterByActivity,
       } from '../actions';
import {Link} from 'react-router-dom';
import CountryCard from './CountryCard';
import Paginated from './Paginated'
import SearchBar from './SearchBar'
import styles from './Home.module.css'
import Loader from './Loader'

export default function Home() {

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const allActivities = useSelector((state) => state.activities)
    //Aplicando el paginado.
    const [order, setOrder] = useState('')                                            //Para el ordenamiento
    const [currentPage, setCurrentPage] = useState(1);                                //Pagina 1   
    const [countryForPage, /*setCountryForPage*/] = useState(10);                         //10 elem por Pag.
    const indexLastCountry = currentPage === 1 ? 9 : currentPage * countryForPage -1;  //9 - 19 - 29  
    const indexFirsCountry = currentPage === 1 ? 0 : indexLastCountry - countryForPage; // 0- 9 - 19
    const currentCountries = allCountries.slice(indexFirsCountry, indexLastCountry);  //Division del array
    //Loader
    const [loading, setLoading] = useState(true)
    //Aplicamos una variable paginated para renderizar
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)  
    }

    useEffect (() => {
        setLoading(true)
        setTimeout(() =>{
            dispatch(getAllCountries())
        }, 500);
        setLoading(false)
        dispatch(getAllActivities());
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllCountries());
    }
   
    function handleOrderName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleOrderPopulation(e) {
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleFilterContinent(e) {
        e.preventDefault()
        dispatch(filterByContinent(e.target.value));
    }

    function handleFilterActivity(e){
        e.preventDefault()
        dispatch(filterByActivity(e.target.value));
    }

    return(
        <div className={styles.body}>
            <nav className={styles.nav}>
                <p className={styles.navp}>PI COUNTRIES APP</p>
                <div className={styles.items}>
                    <Link to='/activity'><button className={styles.button}>Create Activity</button></Link>
                    <SearchBar/>
                </div>
            </nav>
            <div className={styles.header}>
                <div className={styles.order}>
                    <p className={styles.headp}>Order</p>
                    <select onChange={e => handleOrderName(e)} className={styles.select}>
                        <option hidden>Order by Name</option>
                        <option value='asc Name'>A-Z</option>
                        <option value='desc Name'>Z-A</option>
                    </select>
                    <select onChange={e => handleOrderPopulation(e)} className={styles.select}>
                        <option hidden>Order by Population</option>
                        <option value='asc Population'>Min-Max</option>
                        <option value='desc Population'>Max-Min</option>
                    </select>
                </div>
                <div className={styles.headtitle} >
                    <h1 className={styles.title}>COUNTRIES OF THE WORLD</h1>
                    <button onClick={e=>{handleClick(e)}} className={styles.refresh}>
                        Refresh
                    </button>
                </div>
                <div className={styles.order} >
                    <p className={styles.headp}>Filter</p>
                    <select onChange={e => handleFilterContinent(e)} className={styles.select}>
                        <option value='All Continents'>All Continents</option>
                        <option value='Africa'>Africa</option>
                        <option value='Antarctica'>Antartica</option>
                        <option value='Europe'>Europe</option>
                        <option value='North America'>North America</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='South America'>South America</option>
                    </select>
                    <select onChange={e => handleFilterActivity(e)} className={styles.select}>
                        <option value='All Activities'>All Activities</option>
                        {allActivities?.map(e => 
                        ( 
                            <option value={e.name}
                                    key={e.id}> {e.name} 
                            </option>
                        )
                        )}
                    </select>
                </div>
            </div>
                <div>
                    <Paginated 
                    countryForPage={countryForPage}
                    allCountries={allCountries.length}
                    paginated={paginated}
                    />
                    <div className={styles.container}>
                    {  
                    allCountries.length === 0
                    ? <Loader setLoading={setLoading}/>
                    
                    : currentCountries.map( elem => {
                        return (
                        <div className={styles.card}>
                        <CountryCard
                        key={elem.id}
                        id={elem.id} 
                        name={elem.name} 
                        flag={elem.flag} 
                        continent={elem.continent}
                        population={elem.population}
                        />
                        </div>)
                    })
                    } 
                    
                    </div>
                </div>
        </div>

    )
    
}