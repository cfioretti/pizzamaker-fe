import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function MyDialog(props) {

  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.close} aria-labelledby="max-width-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
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
