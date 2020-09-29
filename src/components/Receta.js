import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { ModalContext } from '../context/ModalContext'

/*Materia UI */
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));





/*FUNCTIONAL COMPONENT */
const Receta = ({receta}) => {
    
    //Configuración del modal de material ui
    const [ modalStyles ] = useState(getModalStyle)
    const [open, setOpen] = useState(false)

    const classes = useStyles()
  
    //extraer los valores del context
    const { detallesreceta, setIdReceta, setDetallesReceta } = useContext(ModalContext)
    
    
    
    // manejar el click
    const handleClick = () =>{
        setIdReceta(receta.idDrink);
        handleOpen()      
    }

    // Manejar abrir y cerrar Modal
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)

        //reinicio  los state del modalContext a su estado inicial
        setIdReceta(null);
        setDetallesReceta({})
    }

    //muestra y formatea los ingredientes de la receta
    const mostrarIngredientes = info =>{
        let ingredientes = []
        for (let i = 1; i < 16; i++) {

            const ingrediente = info[`strIngredient${i}`];
            const cantidad = info[`strMeasure${i}`];


            if(ingrediente){
                ingredientes.push(                    
                    <li>{ingrediente}---{cantidad}</li>
                )
            }
            
        }

        return (
            ingredientes.map( fila =>(fila))
        )
    }


    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>

                <img 
                    src={receta.strDrinkThumb}
                    className="card-img-top"
                    alt={`Receta de ${receta.strDrink}`}
                />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary" 
                        onClick= { handleClick } 
                         
                    >Ver Receta</button>
                    <Modal
                        open = {open}
                        onClose= { handleClose }
                    >
                        <div 
                            style= {modalStyles}
                            className={classes.paper}
                        >
                            <h2>{detallesreceta.strDrink}</h2>
                            <h3 className="mt-4 ">Instrucciones</h3>
                            <p>
                                {!detallesreceta.strInstructionsES 
                                    ? 
                                        detallesreceta.strInstructions
                                    :
                                        detallesreceta.strInstructionsES    
                                }
                            </p>

                            <img 
                                className="img-fluid my-2"
                                src={detallesreceta.strDrinkThumb}
                                alt={`Imagen de ${detallesreceta.strDrink}`}
                            />
                            <h3 className="mt-4 ">Ingredientes y Cantidades</h3>
                            <ul>
                                { mostrarIngredientes(detallesreceta) }
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
            
            
        </div>
    )
}

Receta.propTypes = {
    receta: PropTypes.object.isRequired
}

export default Receta
