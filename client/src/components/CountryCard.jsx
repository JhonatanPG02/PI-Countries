import React from 'react';
import {Link} from 'react-router-dom';
import styles from './CountryCard.module.css'

export default function CountryCard({flag, name, continent, population, id}) {
    return (
        <div key={id}>
            <img src={flag} alt='imagen country' className={styles.img}/>
            <h4 className={styles.name}> {name}</h4>
            <p className={styles.paf}>Continent: {continent}</p>
            <p className={styles.paf}>Population: {population}</p>
            <Link to={`/countries/${id}`}><button className={styles.details}>View Details</button></Link>
        </div>
    );
}