import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AgregarOpinion (user) {
    const navigate = useNavigate();
    const [enteredCalificacion, setCalificacion] = useState('');
    const [enteredComentario, setComentario] = useState('');
    const [opinion, setOpinion] = useState('');    

    const calificacionChangeHandler = (event) => {
        setCalificacion(event.target.value);
    };

    const comentarioChangeHandler = (event) => {
        setComentario(event.target.value);
    };

    const opinionChangeHandler = (event) => {
        setOpinion([enteredCalificacion,enteredComentario]);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(opinion);
        var lista = [user, opinion]
        const response = await fetch('http://127.0.0.1:5000/agregarOpinion', {
            method:'POST',
            body: JSON.stringify(lista),
            headers: {
                'Content-Type':'application/json'
            }
        });
        console.log(response);
        const data = await response.json();    
        console.log(data);
        
        navigate('/comprador');
        setOpinion('');
        setCalificacion('');
        setComentario('');
    };

    return ( 
        <form onSubmit={submitHandler}>  
            <div>
            <label>Calificación (0-10): </label>
                <input 
                    id="calificacion"
                    name="calificacion"
                    type='number'
                    value={enteredCalificacion}
                    onChange={calificacionChangeHandler}
                    min = "0"
                    max = "10"
                />
            </div>
            <div>
                <label>Comentario(s): </label>
                <input
                    id="comentario"
                    name="comentario"
                    type='text'
                    value={enteredComentario}
                    onChange={comentarioChangeHandler}
                />
            </div>       
            <button type="submit" onClick={opinionChangeHandler}>Agregar</button>
        </form>
    );
};

export default AgregarOpinion;