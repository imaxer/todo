//@flow
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

//region types
type TaskListProps = {
  children: Array<React.ReactNode>,
  classes: Object
};
//endregion

const styles = theme => ({
  root: {
    width: theme.appWidth,
    margin: 'auto'
  }
});

const GridList = ({ classes, children }: TaskListProps): React.ReactNode => (
  <Grid container direction="column" spacing={8} className={classes.root}>
    {React.Children.map(children, child => (
      <Grid item>{child}</Grid>
    ))}
  </Grid>
);

export default withStyles(styles, { name: 'task-list' })(GridList);
