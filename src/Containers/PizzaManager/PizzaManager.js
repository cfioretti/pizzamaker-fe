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
        const doughTotal = responseData.data.dough;
        const toppingTotal = responseData.data.topping;
        const splitIngredients = responseData.data.splitIngredients;
        const doughTotalIngredients = doughTotal.Ingredients.reduce((acc, ingredient) => {
          acc[ingredient.Name] = ingredient.Amount;
          return acc;
        }, { total: doughTotal.total });
        const doughSplitIngredients = splitIngredients.splitDough;
        const toppingTotalIngredients = toppingTotal.Ingredients.reduce((acc, ingredient) => {
          acc[ingredient.Name] = ingredient.Amount;
          return acc;
        }, {});
        const toppingSplitIngredients = splitIngredients.splitTopping;
        setState({
          ...state,
          totalIngredients: doughTotalIngredients,
          panIngredients: doughSplitIngredients,
          toppingTotalIngredients: toppingTotalIngredients,
          toppingSplitIngredients: toppingSplitIngredients
        });
      }).catch(() => {
      setState({
        ...state,
        totalIngredients: "",
        panIngredients: "",
        toppingTotalIngredients: "",
        toppingSplitIngredients: ""
      });
    })
  }

  let doughTotalIngredients = "";
  let doughSplitIngredients = "";
  let toppingTotalIngredients = "";
  let toppingSplitIngredients = "";

  const format = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/(\d+)/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());
  };

  if (state.totalIngredients) {
    doughTotalIngredients = Object.keys(state.totalIngredients).map(key => (
      <p key={key}>{format(key)}: {state.totalIngredients[key]} g</p>
    ));
  }

  if (state.panIngredients) {
    doughSplitIngredients = state.panIngredients.map((obj, index) => (
      <p key={index}>{format(obj.shape)}: {obj.dough.total} g</p>
    ));
  }

  if (state.toppingTotalIngredients) {
    toppingTotalIngredients = Object.keys(state.toppingTotalIngredients).map(key => (
      <p key={key}>{format(key)}: {state.toppingTotalIngredients[key]} g</p>
    ));
  }

  if (state.toppingSplitIngredients) {
    toppingSplitIngredients = state.toppingSplitIngredients.map((obj, index) => (
      <p key={index}>{format(obj.name)}: {obj.topping} g</p>
    ));
  }

  return (
    <Aux>
      {state.selectedPans.length > 0 ?
        <h3 style={{color: '#223b59'}}>Select one or more panssss</h3> :
        <h3 style={{visibility: "hidden"}}>Select one or more panssss</h3>}
      <PanList pans={state.pans} selectedPans={state.selectedPans} selectHandler={selectPanHandler}
               addHandler={openFormHandler}/>
      <Button size="medium" onClick={calculateIngredients} color="primary" variant="contained">Ingredient
        calculation</Button>
      {(doughTotalIngredients || doughSplitIngredients) ?
        <Ingredients totalIngredients={doughTotalIngredients} panIngredients={doughSplitIngredients} title={"Dough"}/> : null}
      {(toppingTotalIngredients || toppingSplitIngredients) ?
        <Ingredients totalIngredients={toppingTotalIngredients} panIngredients={toppingSplitIngredients} title={"Topping"}/> : null}
      <MyDialog title="Add a pan" open={state.activity === "addPan"} close={closeFormHandler}>
        <PanForm closeModal={closeFormHandler} complete={addPan}/>
      </MyDialog>
    </Aux>
  );
};

export default PizzaManager;
