import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'


//crear context
export const ModalContext = createContext();
 

const ModalProvider= props =>{
    // state de la receta seleccionada
    const [idreceta, setIdReceta] = useState(null)
    const [detallesreceta, setDetallesReceta] = useState({})

    useEffect(() => {
        if(!idreceta)return;

        const consultarAPI= async()=>{

            const url= `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resultado = await axios(url)

            setDetallesReceta(resultado.data.drinks[0]);
        }
        consultarAPI()

    }, [idreceta])

    return(
        <ModalContext.Provider
            value={{
                detallesreceta,
                setIdReceta,
                setDetallesReceta
            }}
        >
            { props.children }
        </ModalContext.Provider>
    )
}

export default ModalProvider;