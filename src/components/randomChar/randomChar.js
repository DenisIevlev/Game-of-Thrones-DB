import React, { useState, useEffect } from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

function RandomChar() {
    
    const [character, updateCharacter] = useState({});
    const [loading, onCharLoaded] = useState(true);
    const [error, onError] = useState(false);

    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, 1500);
        return () => {
            clearInterval(timerId);
        }
    }, [])

        const gotService = new GotService();

        const updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 1);
        gotService.getCharacter(id)
        .then((data) => { 
            updateCharacter(data)
            onCharLoaded(false);
        }) 
        .catch(() => {
            onError(true)
            onCharLoaded(false);
        })
    } 
        
        const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;

        const spinner = loading ? <Spinner></Spinner> : null;
        const content = !(loading || error) ?  <View character={character}></View> : null;
        

        return (
            <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
            </div>
        );
    }

const View = ({ character }) => {
    const {name, gender, born, died, culture} = character;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomChar;