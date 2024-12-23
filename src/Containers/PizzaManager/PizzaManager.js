import React, { useState }  from 'react';
import Aux from '../../hoc/Aux/Aux';
import PanList from '../../Components/PanList/PanList';
import PanForm from '../../Components/PanForm/PanForm';
import Button from '@material-ui/core/Button';
import MyDialog from '../../Components/UI/MyDialog/MyDialog';
import axios from '../../Axios/Axios';
import Ingredients from '../../Components/Ingredients/Ingredients';

const PizzaManager = () => {
    const [state, setState] = useState({
        activity: 'ready',
        pans: [],
        selectedPans: []
    });

    const ingredientLabels = {
        dough: "Impasto",
        flour: "Farina",
        water: "Acqua",
        salt: "Sale",
        evoOil: "Olio d'Oliva",
        yeast: "Lievito"
    }

    const panLabels = {
        rectangular: "Rettangolare",
        square: "Quadrata",
        round: "Rotonda",
    }

    const openFormHandler = () => {
        setState({...state, activity: "addPan"});
    }

    const closeFormHandler = () => {
        setState({...state, activity: 'ready'});
    }

    const selectPanHandler = (index) => {
        console.log("Selected");
        let selectedPans = [...state.selectedPans];

        if ( !selectedPans.includes(index) ) {
            selectedPans.push(index);
            
        } else {
            selectedPans.splice(selectedPans.indexOf(index), 1);
           
        }

        let newState = {
            ...state,
            selectedPans: selectedPans
        }
        setState(newState);
    }

    const addPan = (pan) => {
        let pans = [...state.pans, pan];

        let selectedPans = [...state.selectedPans];
        selectedPans.push(pans.length - 1);

        setState({
            ...state, 
            pans: pans,
            selectedPans: selectedPans,
            activity: 'ready'
        });
    }

    const calculateIngredients = () => {
        let panToSend = state.selectedPans.map((value) => {
            return state.pans[value];
        });
        axios.post("/api/pans", {pans: panToSend})
        .then(res => {
            let total = res.data.total;
            let pans = res.data.pans;
            console.log(pans);
            setState({
                ...state,
                totalIngredients: total,
                panIngredients: pans
            });
        }).catch(() => {
            setState({
                ...state,
                totalIngredients: "",
                panIngredients: ""
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
            <p key={index}>{panLabels[obj.shape]}: {obj.dough} g</p>
        ));
    }


    return (
        <Aux>
            {state.selectedPans.length > 0 ?
            <h3 style={{color: '#223b59'}}>Seleziona una o più teglie</h3>: <h3 style={{visibility: "hidden"}}>Seleziona una o più teglie</h3>}
            <PanList pans={state.pans} selectedPans={state.selectedPans} selectHandler={selectPanHandler} addHandler={openFormHandler}/>
            <Button size="medium" onClick={calculateIngredients} color="primary" variant="contained">Calcola ingredienti</Button>
            {(totals || panIngredients) ? <Ingredients totalIngredients={totals} panIngredients={panIngredients}/> : null}
            <MyDialog title="Aggiungi una teglia" open={state.activity === "addPan"} close={closeFormHandler}>
                <PanForm closeModal={closeFormHandler} complete={addPan}/>   
            </MyDialog>
        </Aux>
    );
};

export default PizzaManager;
