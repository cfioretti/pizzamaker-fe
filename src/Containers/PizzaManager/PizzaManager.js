import React, { useState } from 'react';
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

  const panLabels = {
    rectangular: "Rectangular",
    square: "Square",
    round: "Round",
  }

  const openFormHandler = () => {
    setState({...state, activity: "addPan"});
  }

  const closeFormHandler = () => {
    setState({...state, activity: 'ready'});
  }

  const selectPanHandler = (index) => {
    let selectedPans = [...state.selectedPans];

    if (!selectedPans.includes(index)) {
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
    let panToSend = state.selectedPans.map((value) => state.pans[value]);
    let uuid = "00000000-0000-0000-0000-000000000000";

    axios.post("/recipes/" + uuid + "/aggregate", {pans: panToSend})
      .then(res => {
        const responseData = res.data;
        const total = responseData.data.dough;
        const totalIngredients = total.Ingredients.reduce((acc, ingredient) => {
          acc[ingredient.Name] = ingredient.Amount;
          return acc;
        }, { total: total.total });
        const pans = responseData.data.splitIngredients.splitDough;
        setState({
          ...state,
          totalIngredients: totalIngredients,
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

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (state.totalIngredients) {
    totals = Object.keys(state.totalIngredients).map(key => (
      <p key={key}>{capitalize(key)}: {state.totalIngredients[key]} g</p>
    ));
  }

  if (state.panIngredients) {
    panIngredients = state.panIngredients.map((obj, index) => (
      <p key={index}>{panLabels[obj.shape]}: {obj.dough.total} g</p>
    ));
  }

  return (
    <Aux>
      {state.selectedPans.length > 0 ?
        <h3 style={{color: '#223b59'}}>Select one or more pans</h3> :
        <h3 style={{visibility: "hidden"}}>Select one or more pans</h3>}
      <PanList pans={state.pans} selectedPans={state.selectedPans} selectHandler={selectPanHandler}
               addHandler={openFormHandler}/>
      <Button size="medium" onClick={calculateIngredients} color="primary" variant="contained">Ingredient
        calculation</Button>
      {(totals || panIngredients) ?
        <Ingredients totalIngredients={totals} panIngredients={panIngredients}/> : null}
      <MyDialog title="Add a pan" open={state.activity === "addPan"} close={closeFormHandler}>
        <PanForm closeModal={closeFormHandler} complete={addPan}/>
      </MyDialog>
    </Aux>
  );
};

export default PizzaManager;
