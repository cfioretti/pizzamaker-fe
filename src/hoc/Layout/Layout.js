import React from 'react';
import Aux from '../Aux/Aux';
import AppBar from '../../Components/Navigation/AppBar/AppBar';

export default function layout(props){

    return (
        <Aux>
            <AppBar pageName={props.title}/>
            <main>
                {props.children}
            </main>
        </Aux>
    );
}
