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
import SectionTitle from '../../Components/UI/SectionTitle/SectionTitle';
import axios from '../../Axios/Axios';
import Ingredients from '../../Components/Ingredients/Ingredients';

const format = (str) => str
  .replace(/([A-Z])/g, ' $1')
  .replace(/(\d+)/g, ' $1')
  .replace(/^./, (char) => char.toUpperCase())
  .trim();

const buildItems = (ingredientArray) =>
  ingredientArray.map((ing) => ({
    label: format(ing.Name),
    value: `${ing.Amount} g`,
  }));

const PizzaManager = () => {
  const [state, setState] = useState({
    activity: 'ready',
    pans: [],
    selectedPans: [],
    error: null,
    loading: false,
    showPrompt: false,
    prompt: '',
    dough: null,
    topping: null,
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

  const deletePanHandler = (index) => {
    setState(prev => {
      const pans = prev.pans.filter((_, i) => i !== index);
      const selectedPans = prev.selectedPans
        .filter(i => i !== index)
        .map(i => (i > index ? i - 1 : i));
      return {...prev, pans, selectedPans};
    });
  }

  const applyRecipeResponse = (res, extraState = {}) => {
    const responseData = res.data;
    const doughTotal = responseData.data.dough;
    const toppingTotal = responseData.data.topping;
    const splitIngredients = responseData.data.splitIngredients;

    const dough = {
      total: `${doughTotal.total} g`,
      items: buildItems(doughTotal.Ingredients),
      panItems: splitIngredients.splitDough.map((obj) => ({
        label: format(obj.shape),
        value: `${obj.dough.total} g`,
      })),
    };

    const topping = {
      items: buildItems(toppingTotal.Ingredients),
      panItems: splitIngredients.splitTopping.map((obj) => ({
        label: format(obj.name),
        value: `${obj.topping} g`,
      })),
    };

    setState(prev => ({
      ...prev,
      dough,
      topping,
      error: null,
      loading: false,
      ...extraState
    }));
  };

  const handleRecipeError = (err) => {
    const message = err.response?.data?.error || "Request failed. Please try again.";
    setState(prev => ({
      ...prev,
      dough: null,
      topping: null,
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

  return (
    <Aux>
      <SectionTitle level="h2" hidden={state.selectedPans.length > 0}>
        Select one or more pans
      </SectionTitle>
      <PanList pans={state.pans} selectedPans={state.selectedPans} selectHandler={selectPanHandler}
               addHandler={openFormHandler} deleteHandler={deletePanHandler}/>
      <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
        <Button size="medium" onClick={calculateIngredients} color="primary" variant="contained"
                disabled={state.loading || state.selectedPans.length === 0}>
          Ingredient calculation
        </Button>
        <Button size="medium" onClick={togglePromptBar} color="primary" variant="outlined"
                disabled={state.loading || state.selectedPans.length === 0}
                startIcon={<WbIncandescentIcon />}
                aria-expanded={state.showPrompt}
                aria-controls="ai-recipe-prompt">
          Generate AI Recipe
        </Button>
      </div>
      {state.showPrompt ?
        <div id="ai-recipe-prompt"
             style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center',
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
      
      {state.dough ?
        <Ingredients title="Dough"
                     total={state.dough.total}
                     items={state.dough.items}
                     panItems={state.dough.panItems}/> : null}
      {state.topping ?
        <Ingredients title="Topping"
                     items={state.topping.items}
                     panItems={state.topping.panItems}/> : null}
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
