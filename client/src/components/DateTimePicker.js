import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function DateTimePicker(props) {
  const { classes } = props;

  return (
    <TextField
      id="datetime-local"
      label="Next appointment"
      type="datetime-local"
      defaultValue="2017-05-24T10:30"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default withStyles(styles)(DateTimePicker);