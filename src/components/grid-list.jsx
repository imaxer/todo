//@flow
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
  },
  enter: {
    opacity: 0.01
  },
  enterActive: {
    opacity: 1,
    transition: 'opacity 500ms ease-in'
  },
  exit: {
    opacity: 1
  },
  exitActive: {
    opacity: 0.01,
    transition: 'opacity 500ms ease-in'
  }
});

const GridList = ({ classes, children }: TaskListProps) => (
  <Grid container direction="column" spacing={8} className={classes.root}>
    <TransitionGroup component={null}>
      {React.Children.map(children, (child, i) => (
        <CSSTransition
          timeout={300}
          classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            exitActive: classes.exit,
            exitDone: classes.exitActive
          }}
        >
          <Grid item>{child}</Grid>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </Grid>
);

export default withStyles(styles, { name: 'task-list' })(GridList);
