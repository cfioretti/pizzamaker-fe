import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: "100%"
  }
}));


function getSteps() {
  return ['Select a pan type', 'Enter dimensions', 'Summary'];
}

export default function PanForm(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: 0,
    panType: "",
    panTypes: {
      round: ["diameter"],
      square: ["edge"],
      rectangular: ["width", "length"]
    },
    panMeasures: {
      
    }
  });
  //const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  //const [panType, setPanType] = React.useState("");

  const handleNext = () => {
    //setActiveStep(prevActiveStep => prevActiveStep + 1);
    if (state.activeStep === steps.length - 1) {
      props.complete({shape: state.panType, measures: state.panMeasures});
    }

    setState(prevState => ({...state, activeStep: prevState.activeStep + 1}));
  };

  const handleBack = () => {
    //setActiveStep(prevActiveStep => prevActiveStep - 1);
    setState(prevState => ({...state, activeStep: prevState.activeStep - 1}));
  };

  const handleInputChange = (dim) => (event) => {
    let value = event.target.value;
    setState(() => ({
      ...state,
      panMeasures: {
        ...state.panMeasures,
        [dim]: value
      }
    }));
  }

  const handleTypeChange = (event) => {
    let val = event.target.value;
    //setPanType(event.target.value);
    let panMeasures = {};
    state.panTypes[event.target.value].forEach((val) => {
      panMeasures[val] = ""
    });

    setState(() => ({
      ...state, 
      panType: val,
      panMeasures: panMeasures
    }));
  };

  function getStepContent(step) {
    const measureLabels = {
      diameter: "Diameter",
      edge: "Edge",
      width: "Width",
      length: "Length"
    }

    const panLabels = {
      rectangular: "Rectangular",
      square: "Square",
      round: "Round",
    }

    let shape = state.panType ? state.panType : null;

    switch (step) {
      case 0:
        return (
            <FormControl component="fieldset">
              <RadioGroup name="panType" value={state.panType} onChange={handleTypeChange}>
                <FormControlLabel value="round" control={<Radio />} label={panLabels.round} />
                <FormControlLabel value="square" control={<Radio />} label={panLabels.square} />
                <FormControlLabel value="rectangular" control={<Radio />} label={panLabels.rectangular} />
              </RadioGroup>
            </FormControl>
        );
      case 1:
        return (
          state.panTypes[shape]? state.panTypes[shape].map(dim => {
            return (
                <TextField
                  style={{margin: "10px 5px"}}
                  key={dim}
                  label={measureLabels[dim]}
                  variant="outlined"
                  helperText="Insert a number"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    value: state.panMeasures ? state.panMeasures[dim] : ""
                  }}
                  onChange={handleInputChange(dim)}
                />
            )}) : null
          );
      case 2:
        return (
          <div>
            <Typography variant="body1">
              Pan <strong>{panLabels[state.panType]}</strong>
            </Typography>
            {Object.keys(state.panMeasures).map((key) => (
              <Typography key={key} variant="body1">
                {measureLabels[key]}: <strong>{state.panMeasures[key]}</strong> cm
              </Typography>
            ))}
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  return (
    <Grid container className={classes.root} justifyContent="center" spacing={2}>
        <Grid item lg={6} sm={12}>
            <Grid container className={classes.root} justifyContent="flex-start" spacing={2}>
                <Stepper activeStep={state.activeStep} className={classes.fullWidth} orientation="vertical">
                    {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                        {getStepContent(index)}
                        <div className={classes.actionsContainer}>
                            <div>
                            <Button
                                disabled={state.activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                              Previous
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {state.activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                            </Button>
                            </div>
                        </div>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
            </Grid>
        </Grid>
    </Grid>
  );
}
