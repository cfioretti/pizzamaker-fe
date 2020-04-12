import React, { useState }  from 'react';
import Aux from '../../hoc/Aux/Aux';
import PanList from '../../Components/PanList/PanList';
import PanForm from '../../Components/PanForm/PanForm';
import Button from '@material-ui/core/Button';
import MyDialog from '../../Components/UI/MyDialog/MyDialog';
import axios from 'axios';
import Ingredients from '../../Components/Ingredients/Ingredients';


const PizzaManager = () => {
    const [state, setState] = useState({
        activity: 'ready',
        pans: [],
    });

    const ingredientLabels = {
        dough: "Impasto",
        flour: "Farina",
        water: "Acqua",
        salt: "Sale",
        evoOil: "Olio d'Oliva",
        yeast: "Lievito"
    }

    const measureLabels = {
        diameter: "Diametro",
        edge: "Lato",
        width: "Larghezza",
        length: "Lunghezza"
    }

    const panLabels = {
        rectangular: "Rettangolare",
        square: "Quadrata",
        round: "Rotonda",
    }

    const openFormHandler = (event) => {
        setState({...state, activity: "addPan"});
    }

    const closeFormHandler = () => {
        setState({...state, activity: 'ready'});
    }

    const selectPanHandler = (event) => {
        let pans = [...state.pans];
        pans[event.target.index - 1].selected = true;
        const newState = {
            ...state,
            pans: pans
        }
        setState(newState);
    }

    const addPan = (pan) => {
        let pans = [...state.pans, pan];

        setState({
            ...state, 
            pans: pans,
            activity: 'ready'
        });
        return;
    }

    const calculateIngredients = () => {
        axios.post("http://127.0.0.1:8000/api/pans", {pans: state.pans})
        .then(res => {
            let total = res.data.total;
            let pans = res.data.pans;
            console.log(pans);
            setState({
                ...state,
                totalIngredients: total,
                panIngredients: pans
            });
        })
    }

    let totals = "";
    let panIngredients = "";

    if (state.totalIngredients) {
        totals = Object.keys(state.totalIngredients).map(key => (
            <p key={key}>{ingredientLabels[key]}: {state.totalIngredients[key]} g</p>
        ));
    }

    if (state.panIngredients) {
        panIngredients = state.panIngredients.map((obj, index) => (
            <p key={index}>{panLabels[obj.shape]}: {obj.dough}</p>
        ));
    }


    return (
        <Aux>
            <PanList pans={state.pans} selectHandler={selectPanHandler} addHandler={openFormHandler}/>
            {(totals || panIngredients) ? <Ingredients totalIngredients={totals} panIngredients={panIngredients}/> : null}
            <Button size="medium" onClick={calculateIngredients} color="primary" variant="contained">Calcola ingredienti</Button>
            <MyDialog title="Aggiungi una teglia" open={state.activity === "addPan"} close={closeFormHandler}>
                <PanForm closeModal={closeFormHandler} complete={addPan}/>   
            </MyDialog>
        </Aux>
    );
};

export default PizzaManager;