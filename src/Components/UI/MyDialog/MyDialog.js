import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
  },
  background: '#2C8D93'
}));

export default function MyDialog(props) {

  const classes = useStyles();

  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.close} aria-labelledby="max-width-dialog-title">
        <DialogTitle id="form-dialog-title">
          {props.title}
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          {props.buttons}
        </DialogActions>
      </Dialog>
    </div>
  );
}
