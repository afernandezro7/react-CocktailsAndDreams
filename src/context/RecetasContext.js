import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const RecetasContext = createContext();

const RecetasProvider = props =>{

    const [recetas, setRecetas] = useState([])
    const [busqueda, buscarRecetas] = useState({
        ingrediente: '',
        categoria: ''
    })
    const [consultar, setconsultar] = useState(false)

    const {ingrediente, categoria} = busqueda
    
    useEffect(() => {
        if(consultar){

            const consultarAPI = async()=>{
                const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
                
                const recetas = await axios(url)
                setRecetas(recetas.data.drinks);
            }
            consultarAPI()
        }
        setconsultar(false)
        // eslint-disable-next-line
    }, [busqueda])


    return(
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                setconsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider
