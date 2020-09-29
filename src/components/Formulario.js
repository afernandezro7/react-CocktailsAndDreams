import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext'


const Formulario = () => {


    const { categorias } = useContext(CategoriasContext)
    const {buscarRecetas, setconsultar}  = useContext(RecetasContext)
    
    const [busqueda, setBusqueda] = useState({
        ingrediente: '', 
        categoria: '' 
    })
    const{ ingrediente, categoria } = busqueda;

    //Funcion para leer los contenidos
    const handleChange =( {target} )=>{
        setBusqueda({
            ...busqueda,
            [target.name]: target.value
        })

    }

    // Controlar el submit del form
    const handleSubmit = e=>{
        e.preventDefault();
        
        // validar campos
        if(categoria.trim()==='')return

        //enviar datos al context Recetas
        buscarRecetas(busqueda)
        setconsultar(true)
    }

    return (
        <form
            className="col-md-12"
            onSubmit={ handleSubmit }
        >
            <fieldset className="text-center">
                <legend>Buscar bebidas por categoría o por ingrdientes</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        name="ingrediente"
                        placeholder="Buscar por Ingredientes"
                        onChange={ handleChange }
                        value= { ingrediente }
                    />
                </div>                   
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={ handleChange }
                        value= { categoria }
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {categorias.map( ({strCategory}) => (
                            <option 
                                key={strCategory} 
                                value={strCategory}
                            >
                                {strCategory}
                            </option>
                        ))}
                    </select>
                </div>                   
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                        
                    />
                </div>                   
            </div>
        </form>
    )
}



export default Formulario
