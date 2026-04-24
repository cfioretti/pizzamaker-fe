import React from 'react';
import Aux from '../Aux/Aux';
import AppBar from '../../Components/Navigation/AppBar/AppBar';

const srOnlyStyle = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
};

export default function Layout(props) {
    return (
        <Aux>
            <AppBar pageName={props.title}/>
            <main>
                <h1 style={srOnlyStyle}>{props.title}</h1>
                {props.children}
            </main>
        </Aux>
    );
}
