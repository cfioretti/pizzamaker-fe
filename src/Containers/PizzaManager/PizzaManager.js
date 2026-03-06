import React, { useState } from 'react';
import Aux from '../../hoc/Aux/Aux';
import PanList from '../../Components/PanList/PanList';
import PanForm from '../../Components/PanForm/PanForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import MyDialog from '../../Components/UI/MyDialog/MyDialog';
import axios from '../../Axios/Axios';
import Ingredients from '../../Components/Ingredients/Ingredients';

const PizzaManager = () => {
  const [state, setState] = useState({
    activity: 'ready',
    pans: [],
    selectedPans: [],
    error: null,
    loading: false,
    showPrompt: false,
    prompt: ''
  });

  const openFormHandler = () => {
    setState(prev => ({...prev, activity: "addPan"}));
  }

  const closeFormHandler = () => {
    setState(prev => ({...prev, activity: 'ready'}));
  }

  const selectPanHandler = (index) => {
    setState(prev => {
      let selectedPans = [...prev.selectedPans];
      if (!selectedPans.includes(index)) {
        selectedPans.push(index);
      } else {
        selectedPans.splice(selectedPans.indexOf(index), 1);
      }
      return {...prev, selectedPans};
    });
  }

  const addPan = (pan) => {
    setState(prev => {
      let pans = [...prev.pans, pan];
      let selectedPans = [...prev.selectedPans, pans.length - 1];
      return {...prev, pans, selectedPans, activity: 'ready'};
    });
  }

  const applyRecipeResponse = (res, extraState = {}) => {
    const responseData = res.data;
    const doughTotal = responseData.data.dough;
    const toppingTotal = responseData.data.topping;
    const splitIngredients = responseData.data.splitIngredients;
    const doughTotalIngredients = doughTotal.Ingredients.reduce((acc, ingredient) => {
      acc[ingredient.Name] = ingredient.Amount;
      return acc;
    }, { total: doughTotal.total });
    const toppingTotalIngredients = toppingTotal.Ingredients.reduce((acc, ingredient) => {
      acc[ingredient.Name] = ingredient.Amount;
      return acc;
    }, {});
    setState(prev => ({
      ...prev,
      totalIngredients: doughTotalIngredients,
      panIngredients: splitIngredients.splitDough,
      toppingTotalIngredients: toppingTotalIngredients,
      toppingSplitIngredients: splitIngredients.splitTopping,
      error: null,
      loading: false,
      ...extraState
    }));
  };

  const handleRecipeError = (err) => {
    const message = err.response?.data?.error || "Request failed. Please try again.";
    setState(prev => ({
      ...prev,
      totalIngredients: "",
      panIngredients: "",
      toppingTotalIngredients: "",
      toppingSplitIngredients: "",
      error: message,
      loading: false
    }));
  };

  const calculateIngredients = () => {
    const panToSend = state.selectedPans.map((value) => state.pans[value]);
    const uuid = "00000000-0000-0000-0000-000000000000";

    setState(prev => ({...prev, loading: true, error: null}));
    axios.post("/recipes/" + uuid + "/aggregate", {pans: panToSend})
      .then(res => applyRecipeResponse(res))
      .catch(handleRecipeError);
  }

  const togglePromptBar = () => {
    setState(prev => ({...prev, showPrompt: !prev.showPrompt}));
  };

  const generateAIRecipe = () => {
    const panToSend = state.selectedPans.map((value) => state.pans[value]);
    const hasPrompt = state.prompt.trim().length > 0;
    const body = {
      mode: hasPrompt ? 'prompt' : 'random',
      pans: panToSend
    };
    if (hasPrompt) {
      body.prompt = state.prompt.trim();
    }

    setState(prev => ({...prev, loading: true, error: null}));
    axios.post("/recipes/generate", body)
      .then(res => applyRecipeResponse(res, {prompt: '', showPrompt: false}))
      .catch(handleRecipeError);
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
        <h3 style={{color: '#223b59'}}>Select one or more pans</h3> :
        <h3 style={{visibility: "hidden"}}>Select one or more pans</h3>}
      <PanList pans={state.pans} selectedPans={state.selectedPans} selectHandler={selectPanHandler}
               addHandler={openFormHandler}/>
      <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
        <Button size="medium" onClick={calculateIngredients} color="primary" variant="contained"
                disabled={state.loading || state.selectedPans.length === 0}>
          Ingredient calculation
        </Button>
        <Button size="medium" onClick={togglePromptBar} color="secondary" variant="contained"
                disabled={state.loading || state.selectedPans.length === 0}
                startIcon={<WbIncandescentIcon />}>
          Generate AI Recipe
        </Button>
      </div>
      {state.showPrompt ?
        <div style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center',
                     flexWrap: 'wrap', margin: '16px auto', maxWidth: 700}}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Describe your recipe or leave empty for random"
            value={state.prompt}
            onChange={(e) => { const val = e.target.value; setState(prev => ({...prev, prompt: val})); }}
            onKeyDown={(e) => { if (e.key === 'Enter') generateAIRecipe(); }}
            style={{flex: 1, minWidth: 200}}
            disabled={state.loading}
          />
          <Button size="medium" onClick={generateAIRecipe} color="secondary" variant="contained"
                  disabled={state.loading}>
            {state.loading ? <CircularProgress size={20} color="inherit" style={{marginRight: 8}}/> : null}
            Generate
          </Button>
        </div>
        : null}
      
      {(doughTotalIngredients || doughSplitIngredients) ?
        <Ingredients totalIngredients={doughTotalIngredients} panIngredients={doughSplitIngredients} title={"Dough"}/> : null}
      {(toppingTotalIngredients || toppingSplitIngredients) ?
        <Ingredients totalIngredients={toppingTotalIngredients} panIngredients={toppingSplitIngredients} title={"Topping"}/> : null}
      <Snackbar
        open={!!state.error}
        autoHideDuration={8000}
        onClose={() => setState(prev => ({...prev, error: null}))}
        message={state.error}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      />
      <MyDialog title="Add a pan" open={state.activity === "addPan"} close={closeFormHandler}>
        <PanForm closeModal={closeFormHandler} complete={addPan}/>
      </MyDialog>
    </Aux>
  );
};

export default PizzaManager;
