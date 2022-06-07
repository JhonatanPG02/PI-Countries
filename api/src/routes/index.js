// Importar axios para consumir la API 
const axios = require('axios')

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country, Activity } = require('../db')

const router = Router();

//Solicitud a la API y almacenando en la BD.
const getCountries = async () => {

    const countriesBD = await Country.findAll({
        attributes: ['id', 'name', 'flag', 'continent', 'capital', 'subregion', 'area', 'population'],
    });

    if (!countriesBD.length){
        try {
        const allCountryUrl = await axios.get("https://restcountries.com/v3/all");
        const allCountry = allCountryUrl.data.map((elem) => {

            return {
                id: elem.cca3,
                name: elem.name.common,
                flag: elem.flags[1],
                continent: elem.continents[0],
                capital: elem.capital?elem.capital[0]:'Capital not found',
                subregion: elem.subregion,
                area: Math.floor(elem.area),
                population: Math.floor(elem.population),
            }
            });
            await Country.bulkCreate(allCountry);
            return allCountry;
        } catch(err) {
            console.log(err)
        }
    } else {
        return countriesBD
    }
}


// Llamada a los paises almacenados de la API y los creados en la BD.
const getAll = async () =>{
    await getCountries()
    return await Country.findAll({                                                  
        include: {
            model: Activity,                                                      //Incluyo Activity
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {attributes: []}
        }
    });
};


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', async (req, res) => {
    const {name} = req.query
    try {
        const countriesTotal = await getAll();
        //Si no me pasan el nombre por query, devuelvo todo
        if(!name) {
            res.status(200).send(countriesTotal);
        //Si me pasan el nombre, filtro del total y devuelvo.
        } else {
            const countryName = countriesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            countryName.length ?
            res.status(200).send(countryName) :
            res.status(404).send('Country not found')
        }
    } catch(err) {
        res.status(404).send(err)
    }
})

router.get('/countries/:id', async (req, res)=> {   
    const countryId= req.params.id
    try {
    //Encontrarlo por primary key e incluir todas las actividades
    const countryById = await Country.findByPk(countryId.toUpperCase(), {
        include : {
            model: Activity,
                attributes:["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
        },
    });
   
    countryById ?
    res.status(200).json(countryById) :
    res.status(404).send('Country not found')
    } catch (err) {
        console.log(err)
        res.status(404).send(err)
    }

})
//Obtener todas las actividades, incluido los datos del País.
router.get('/activity', async (req, res) => {
    try {
        let allAct = await Activity.findAll(
            { include: Country }
        )
        return res.status(200).json(allAct)
    } catch (err) {
        res.status(404).send(err)
    };
})

router.post('/activity', async (req,res) => {
    const {name, difficulty, duration, season, countries} = req.body;       
    try {
        //Creamos nueva actividad con la data necesaria enviada por Body
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        })
        //Encontrar la coincidencia de countries enviada por body
        let activityCountry = await Country.findAll({
            where: { name : countries}
        }); 
        //Agregamos a la nueva actividad creada la coincidencia encontrada
        await newActivity.addCountry(activityCountry);
        res.status(200).send('La actividad se creo con éxito')
    } catch(err) {
        res.status(404).send(err)
    }
  })

module.exports = router;
