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
import FormHelperText from '@material-ui/core/FormHelperText';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "../../Theme/Theme";

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
  },
  errorField: {
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f4896f',
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: '#f4896f',
    },
    '& .MuiInputLabel-root.Mui-error': {
      color: '#f4896f',
    }
  },
  errorText: {
    color: '#f4896f !important'
  }
}));

const MIN_DIMENSION = 10;
const MAX_DIMENSION = 200;

function validatePanType(panType) {
  if (!panType) {
    return 'Please select a pan type';
  }
  return '';
}

function validateDimension(value, fieldName) {
  if (!value) {
    return `${fieldName} is required`;
  }

  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return `${fieldName} must be a number`;
  }

  if (numValue < MIN_DIMENSION) {
    return `${fieldName} must be at least ${MIN_DIMENSION}cm`;
  }

  if (numValue > MAX_DIMENSION) {
    return `${fieldName} cannot exceed ${MAX_DIMENSION}cm`;
  }

  return '';
}

function getSteps() {
  return ['Select pan type', 'Enter dimensions', 'Summary'];
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
    panMeasures: {},
    errors: {
      panType: '',
      measures: {}
    }
  });

  const steps = getSteps();

  const validateCurrentStep = () => {
    let isValid = true;
    const newErrors = {...state.errors};

    if (state.activeStep === 0) {
      newErrors.panType = validatePanType(state.panType);
      isValid = !newErrors.panType;
    } else if (state.activeStep === 1) {
      newErrors.measures = {};
      const dimensions = state.panTypes[state.panType];

      dimensions.forEach(dim => {
        const error = validateDimension(state.panMeasures[dim], measureLabels[dim]);
        if (error) {
          newErrors.measures[dim] = error;
          isValid = false;
        }
      });
    }

    setState(prev => ({
      ...prev,
      errors: newErrors
    }));

    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (state.activeStep === steps.length - 1) {
      props.complete({shape: state.panType, measures: state.panMeasures});
    }

    setState(prevState => ({
      ...prevState,
      activeStep: prevState.activeStep + 1,
      errors: {panType: '', measures: {}}
    }));
  };

  const handleBack = () => {
    setState(prevState => ({
      ...prevState,
      activeStep: prevState.activeStep - 1,
      errors: {panType: '', measures: {}}
    }));
  };

  const handleInputChange = (dim) => (event) => {
    const value = event.target.value;
    setState(prev => ({
      ...prev,
      panMeasures: {
        ...prev.panMeasures,
        [dim]: value
      },
      errors: {
        ...prev.errors,
        measures: {
          ...prev.errors.measures,
          [dim]: ''
        }
      }
    }));
  };

  const handleTypeChange = (event) => {
    const val = event.target.value;
    const panMeasures = {};
    state.panTypes[val].forEach((dim) => {
      panMeasures[dim] = "";
    });

    setState(prev => ({
      ...prev,
      panType: val,
      panMeasures: panMeasures,
      errors: {
        panType: '',
        measures: {}
      }
    }));
  };

  const measureLabels = {
    diameter: "Diameter",
    edge: "Edge",
    width: "Width",
    length: "Length"
  };

  const panLabels = {
    rectangular: "Rectangular",
    square: "Square",
    round: "Round"
  };

  function getStepContent(step) {
    let shape = state.panType ? state.panType : null;

    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset" error={!!state.errors.panType}>
            <RadioGroup name="panType" value={state.panType} onChange={handleTypeChange}>
              <FormControlLabel value="round" control={<Radio color="primary"/>} label={panLabels.round}/>
              <FormControlLabel value="square" control={<Radio color="primary"/>} label={panLabels.square}/>
              <FormControlLabel value="rectangular" control={<Radio color="primary"/>} label={panLabels.rectangular}/>
            </RadioGroup>
            {state.errors.panType && (
              <FormHelperText className={classes.errorText}>{state.errors.panType}</FormHelperText>
            )}
          </FormControl>
        );
      case 1:
        return (
          state.panTypes[shape]?.map(dim => (
            <TextField
              className={classes.errorField}
              style={{margin: "10px 5px"}}
              key={dim}
              label={measureLabels[dim]}
              variant="outlined"
              error={!!state.errors.measures[dim]}
              helperText={state.errors.measures[dim] || `Enter a number between ${MIN_DIMENSION} and ${MAX_DIMENSION}`}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                value: state.panMeasures ? state.panMeasures[dim] : ""
              }}
              onChange={handleInputChange(dim)}
            />
          ))
        );
      case 2:
        return (
          <div>
            <Typography variant="body1">
              Pan type: <strong>{panLabels[state.panType]}</strong>
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
    <ThemeProvider theme={theme}>
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
                          Back
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
    </ThemeProvider>
  );
}
