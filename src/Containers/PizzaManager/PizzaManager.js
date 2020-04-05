import React, { useState }  from 'react';
import Aux from '../../hoc/Aux/Aux';
import PanList from '../../Components/PanList/PanList';
import PanForm from '../../Components/PanForm/PanForm';
import Button from '@material-ui/core/Button';
import MyDialog from '../../Components/UI/MyDialog/MyDialog';
import axios from 'axios';


const PizzaManager = () => {
    const [state, setState] = useState({
        activity: 'ready',
        pans: [],
    });

    const openFormHandler = (event) => {
        setState({...state, activity: "addPan"});
    }

    const closeFormHandler = () => {
        setState({...state, activity: 'ready'});
    }

    const addPan = (pan) => {
        let pans = [...state.pans, pan];

        setState({
            ...state, 
            pans: pans
        });
    }

    const calculateIngredients = () => {
        const req = {
            pans: [
                {
                    shape: "Round",
                    measure: { diameter: 6 }
                },
                {
                    shape: "Rectangular",
                    measure: { width: 6, length: 7}
                }
            ]
        };

        axios.post("http://127.0.0.1:8000/api/pans", req)
        .then(res => {
            const result = res.data;
            setState({
                ...state,
                result: result
            });
            console.log(result);
        })
    }

    return (
        <Aux>
            <PanList pans={state.pans} addHandler={openFormHandler}/>
            {
            state.activity === "addPan" ? 
            <MyDialog title="Aggiungi una teglia" open={state.activity === "addPan"} close={closeFormHandler}>
                <PanForm complete={addPan}/>   
            </MyDialog>
            :<Button size="medium" onClick={calculateIngredients} color="primary" variant="contained">Calcola ingredienti</Button>
            }
        </Aux>
    );
};

export default PizzaManager;