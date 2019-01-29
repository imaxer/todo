//@flow
import * as React from 'react';
import compose from 'recompose/compose';
import withStateHandlers from 'recompose/withStateHandlers';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

//region types
type TaskItemProps = {
  task: Object,
  isCollapse: boolean,
  isWrap: boolean,
  onEditButtonClick: () => {},
  onRemoveButtonClick: () => {},
  toggleWrap: () => void,
  toggleCollapse: () => void
};
//endregion

const dateFormatter = new Intl.DateTimeFormat('en-En', {
  hour12: false,
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
});

const TaskItem = ({
  task,
  isCollapse,
  toggleCollapse,
  onEditButtonClick,
  onRemoveButtonClick,
  isWrap,
  toggleWrap
}: TaskItemProps) => {
  return (
    <Card square raised>
      <CardHeader title={task.title} subheader={dateFormatter.format(new Date(task.date))} />
      <CardContent>
        <Collapse in={!isCollapse} collapsedHeight={'24px'} onEnter={toggleWrap} onExiting={toggleWrap}>
          <Typography variant="body1" component="div" noWrap={isWrap}>
            {task.description}
          </Typography>
        </Collapse>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={toggleCollapse}>
          {isCollapse ? 'Show' : 'Hide'}
        </Button>
        <div style={{ flex: 1 }}/>
        <IconButton onClick={onEditButtonClick} color="primary">
          <Edit />
        </IconButton>
        <IconButton onClick={onRemoveButtonClick} color="secondary">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default compose(
  withStateHandlers(() => ({ isCollapse: true, isWrap: true }), {
    toggleCollapse: ({ isCollapse }) => () => ({ isCollapse: !isCollapse }),
    toggleWrap: ({ isWrap }) => () => ({ isWrap: !isWrap })
  })
)(TaskItem);
