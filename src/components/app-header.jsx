//@flow
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

//region types
type AppHeaderProps = {
  onAddButtonClick: () => void,
  classes: Object
};
//endregion

const styles = theme => ({
  spacer: {
    flex: 1
  },
  toolbar: {
    width: theme.appWidth,
    margin: 'auto'
  }
});

const AppHeader = ({ onAddButtonClick, classes }: AppHeaderProps) => {
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" color="inherit">
          ToDo
        </Typography>
        <div className={classes.spacer} />
        <Button variant="contained" onClick={onAddButtonClick}>
          Add task
        </Button>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.defaultProps = {
  onAddButtonClick: () => {}
};

export default withStyles(styles, { name: 'app-header' })(AppHeader);
