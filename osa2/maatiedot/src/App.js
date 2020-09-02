import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Weather = ({country}) => {
    const [weather, setWeather] = useState({current: {}})
    

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY

        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

   return(
        <div>
            <h1>{country.capital}, päivän sää</h1>
            <p>{weather.current.temperature} celsiusastetta</p>
            <img src={weather.current.weather_icons} alt={'kuva ei näy'} width={100} height={100}/>      
            <p>Tuulen nopeus: {weather.current.wind_speed}</p>
        </div>
    )
}

const Language = ({language}) => {
    return(
        <div>
            <li>
                {language.name}
            </li>
        </div>
    )
}

const Languages = ({languages}) => {
    return(
        <ul>
            {languages.map(x => (<Language key={x.iso639_1} language={x}/>))}
        </ul>
    )
}

const CountryInfo = ({country}) => {
    return(
        <div>
            <h1>{country.name}</h1>
            <p>Pääkaupunki: {country.capital}</p>
            <p>Väkiluku: {country.population}</p>
            <h3>Viralliset kielet:</h3>
            <Languages languages={country.languages} />
            <img src={country.flag} alt={'kuva ei näy'} width={350} height={200}/>
        </div>
    )
}

const Countries = ({countries, searchCon, setSearchCon, weather}) => {
        
    const Country = ({country}) => {
        return(
            <div>
                {country.name} <button onClick={() => setSearchCon(country.name)}>näytä</button>
            </div>
        )
    }
    
    const filteredCountries = [...countries].filter(country => (country.name.toUpperCase().includes(searchCon.toUpperCase())))

    if(filteredCountries.length > 10){
        return(
            <div>liikaa maita</div>
        )
    }else if(filteredCountries.length <= 10 && filteredCountries.length > 1){
        return(
            filteredCountries.map(x => ( <Country key={x.name} country={x}/>))
        )
    }else if(filteredCountries.length === 1){
        return(
            <div>
                <CountryInfo country={filteredCountries[0]} />
                <Weather country={filteredCountries[0]} />
            </div> 
        )
    }else{
        return(
            <div>ei maita</div>
        )
    }

    
}

const App = () => {

    const [ countries, setCountries ] = useState([])
    const [ searchCon, setSearchCon ] = useState('')

    const loggeri = () => {
        console.log(countries[0].name)
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearchCon(event.target.value)
    }

    return(
        <div>
            <form>
                etsi maita: <input value={searchCon} onChange={handleSearchChange}/>
            </form>
            <button onClick={() => loggeri()}>loggaa</button>
            <Countries countries={countries} searchCon={searchCon} setSearchCon={setSearchCon} />
        </div>
    )
}

export default App