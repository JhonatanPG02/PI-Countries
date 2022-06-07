import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getDetails} from '../actions'
import styles from './Details.module.css'


export default function Details(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const country = useSelector((state) => state.details);
    
    useEffect(()=> {
        dispatch(getDetails(id))
    }, [dispatch, id])


    return(
        <div className={styles.body}>
             <nav className={styles.nav}>
                <Link to='/home'><button  className={styles.button}>Go Home</button></Link>
            </nav>
            <div className={styles.container}>
            <div className={styles.card} key={country.id}>
                
                <img src={country.flag} alt="no flag founded" className={styles.img}/>
                <h2>Country Name: {country.name}</h2>
                <h4>Code: {country.id}</h4>
                <p>Continent: {country.continent}</p>
                <p>Capital: {country.capital}</p>
                <p>Subregion: {country.subregion}</p>
                <p>Area: {country.area} km2</p>
                <p>Population: {country.population}</p>
               
            </div>
            
            <div className={styles.blok}>
                {country.activities?.length ? country.activities.map((elem) => (
                <div className={styles.activity} key={elem.id}>
                <h4 >Activity: </h4>
                <p className={styles.name}>{elem.name}</p>
                <p>Difficulty: {elem.difficulty}</p>
                <p>Duration: {elem.duration} hours</p>
                <p>Season: {elem.season}</p></div>
                )) : <p className={styles.noact}>No activities</p>}
            </div>
            </div>
        </div>
    )
}

