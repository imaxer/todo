//@flow
import * as React from 'react';
import type { Task } from '../App';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/DoneOutline';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

//region types
type TaskItemProps = {
  task: Task,
  onDoneButtonClick: (MouseEvent, Task) => void,
  onEditButtonClick: (MouseEvent, Task) => void,
  onRemoveButtonClick: (MouseEvent, Task) => void,
  classes: Object
};
//endregion

const styles = {
  completed: {
    backgroundColor: green[200]
  }
};

const getDateFormattedString = (date: string) => {
  try {
    return new Date(date).toLocaleDateString('en', {
      hour12: false,
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  } catch (e) {
    console.error(e);
    return '';
  }
};

const TaskItem = ({ task, onDoneButtonClick, onEditButtonClick, onRemoveButtonClick, classes }: TaskItemProps) => {
  const { title, description, date, completed } = task;
  const cardClassname = completed ? classes.completed : '';
  return (
    <Card square raised className={cardClassname}>
      <CardHeader title={title} subheader={date ? getDateFormattedString(date) : ''} />
      <CardContent>
        <Typography variant="body1" component="div" noWrap={false}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{ flex: 1 }} />
        <IconButton onClick={event => onDoneButtonClick(event, task)} color="secondary" disabled={completed}>
          <Done />
        </IconButton>
        <IconButton onClick={event => onEditButtonClick(event, task)} color="secondary" disabled={completed}>
          <Edit />
        </IconButton>
        <IconButton onClick={event => onRemoveButtonClick(event, task)} color="primary">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles, { name: 'task-item' })(TaskItem);
