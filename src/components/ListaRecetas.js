import React, { useContext } from 'react'
import { RecetasContext } from '../context/RecetasContext'
import Receta from './Receta'


const ListaRecetas = () => {

    
    const {recetas} = useContext(RecetasContext)
    
    if(recetas.length===0)return null

    return (
        <>
            <h1 className="mt-5">Listado</h1>
            <div className="row mt-5">
                {recetas.map( receta =>(
                    <Receta
                        key={ receta.idDrink }
                        receta={receta}
                    />
                ))}
            </div>
        </>
    )
}

export default ListaRecetas