import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'


// CREAR EL CONTEXT
export const CategoriasContext = createContext();

// Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props)=>{

    //crear state del Context
    const [categorias, setCategorias] = useState([])

    // ejecutar llamado a la api
    useEffect(() => {
        
        const obtenerCategorias = async () =>{
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
                const categorias = await axios(url)
    
                setCategorias(categorias.data.drinks); 
            } catch (error) {
                setCategorias([])
            }
           
        }

        obtenerCategorias()
    }, [])

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;


