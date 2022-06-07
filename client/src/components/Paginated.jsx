import React from 'react';
import styles from './Paginated.module.css'

export default function Paginated({countryForPage, allCountries, paginated}) {
        const pageNumbers = []

        for(let i=1; i<= Math.ceil(allCountries/countryForPage); i++) {
            pageNumbers.push(i)
        }
    return (
        <nav className={styles.pages}>
            <ul className={styles.paginated}>
                { pageNumbers && pageNumbers.map(elem => (
                        <li className={styles.numbers} key={elem}>
                            <button onClick={() => paginated(elem)} className={styles.number}>{elem}</button>
                        </li>
                    ))}
              
            </ul>
        </nav>
    )
}
