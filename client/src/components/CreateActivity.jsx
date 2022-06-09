import React, {useState, useEffect}  from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import {postActivity, getAllCountries} from '../actions'
import styles from './CreateActivity.module.css'


//Validaciones
function validate(input) {
    let errors = {}
    if(!input.name){
        errors.name= 'Name is required'
    } else if(input.name.length < 3){
        errors.name = 'The activity name is invalid'
    } if(!input.name.match( (/^[A-Za-z]+$/))){
        errors.name = 'Name of activity must contain only letters'
    }
    if(!input.difficulty){
        errors.difficulty = 'Difficulty is required'
    }
    if(!input.duration){
        errors.duration = 'Duration is required'
    } else if(input.duration<1 || input.duration>24 ){
            errors.duration = 'You must choose a value between 1 or 24 hours'
    }
    if(!input.season){
        errors.season = 'You must choose at least one season'
    }
    return errors
}




export default function CreateActivity() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allCountries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    })

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input, [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSubmit(e){
        if (input.name.length < 3 || !input.name.match( (/^[A-Za-z]+$/)) || !input.name || !input.difficulty || !input.duration || !input.season || input.countries.length === 0 ){
            e.preventDefault()
           alert('Complete all options')
       } else {
        e.preventDefault()
        setErrors(validate(input))
        dispatch(postActivity(input))
        alert("Activy created succesfully !")
        setInput({ 
            name: '', 
            difficulty: '', 
            duration: '',
            season: '', 
            countries: []
        })
        navigate('/home')
        }
    }

    function handleCheck(e) { 
        if (e.target.checked) { setInput({ ...input, season: e.target.value }) } 
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input, countries: [...input.countries, e.target.value]
        })
    }

    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e)
        })
    }

    return (
        <div className={styles.body}>
            <nav className={styles.nav}>
                <li className={styles.li}>
                    <Link to= '/home'> <button className={styles.button}>Go Home</button></Link>
                </li>
            </nav>
            <div className={styles.container}>
            <h1 className={styles.h1}>CREATE ACTIVITY</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div>
                    <label> Name: </label>
                    <input type="text" 
                           placeholder='Name of the activity'
                           autoComplete="off" 
                           value={input.name} 
                           name="name" 
                           onChange={(e) => handleChange(e)} />
                            {errors.name && (
                            <p className={styles.error}>{errors.name}</p>
                            )}
                </div>
                <div>
                    <label>Difficult : </label>
                        <label>
                            <input
                                type='radio'
                                value='1'
                                name='difficulty'
                                onChange={handleChange}/>
                                
                            1</label>
                        <label>
                            <input
                                type='radio'
                                value='2'
                                name='difficulty'
                                onChange={handleChange}
                            />
                            2</label>
                        <label>
                            <input
                                type='radio'
                                value='3'
                                name='difficulty'
                                onChange={handleChange}
                            />
                            3</label>
                        <label>
                            <input
                                type='radio'
                                value='4'
                                name='difficulty'
                                onChange={handleChange}
                            />
                           4</label>
                        <label>
                            <input

                                type='radio'
                                value='5'
                                name='difficulty'
                                onChange={handleChange}
                            />
                            5</label>
                            {errors.difficulty && (
                            <p className={styles.error}>{errors.difficulty}</p>
                            )}
                </div>
                <div>
                    <label> Duration: </label>
                    <input type="number" min="0" placeholder="Duration in hours" value={input.duration} name="duration" onChange={(e) => handleChange(e)} />
                        {errors.duration && (
                        <p className={styles.error}>{errors.duration}</p>
                        )}
                </div>
                <div >
                    <label> Season: </label>
                        <label><input type="checkbox" value="summer" name="season" onChange={handleCheck} />summer </label>
                        <label><input type="checkbox" value="spring" name="season" onChange={handleCheck} />spring </label>
                        <label><input type="checkbox" value="autumn" name="season" onChange={handleCheck} />autumn </label>
                        <label><input type="checkbox" value="winter" name="season" onChange={handleCheck} />winter </label>
                        {errors.season && (
                        <p className={styles.error}>{errors.season}</p>
                        )}
                </div>
            <div>
                <label> Countries: </label>
                <select 
                    onChange={(e) => handleSelect(e)}>
                <option value='countries'>Select Countries... </option>
                    {
                    allCountries.map(elem =>
                        <option value={elem.name} key={elem.id}>{elem.name}</option>
                    )} 
                </select>
                        {errors.countries && (
                        <p className={styles.error}>{errors.countries}</p>
                        )}
                </div>
               
                { input.countries.map(e =>
                        
                        <div className={styles.elements} key = {e}>
                        <p className={styles.element}>{e}</p>
                        <button className={styles.buttonX}
                            type='button'
                            onClick={() => handleDelete(e)}>x</button>
                        </div>
                    
                    )}
                <button type="submit" className={styles.button3}>CREATE</button>
            </form>
            </div>
        </div>
    )


}


