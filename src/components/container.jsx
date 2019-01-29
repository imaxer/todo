//@flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Task } from '../App';
import compose from 'recompose/compose';
import withStateHandlers from 'recompose/withStateHandlers';
import AppHeader from '../components/app-header';
import GridList from '../components/grid-list';
import { selectors, actions } from '../store/tasks';
import TaskEditDialog from './task-edit-dialog';
import TaskItem from './task-view';

type ContainerProps = {
  init: () => void,
  tasks: Array<Task>,
  saveTask: Task => void,
  removeTask: string => void,
  currentTask: Task | null,
  setCurrentTask: (Task | null) => void,
  closeTaskEditDialog: () => void
};

class App extends React.Component<ContainerProps> {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { tasks, saveTask, removeTask, currentTask, setCurrentTask, closeTaskEditDialog } = this.props;
    return (
      <React.Fragment>
        <AppHeader onAddButtonClick={() => setCurrentTask({})} />
        <GridList>
          {tasks.map(i => (
            <TaskItem
              key={i.id}
              task={i}
              onEditButtonClick={() => setCurrentTask(i)}
              onRemoveButtonClick={() => removeTask(i.id)}
            />
          ))}
        </GridList>
        <TaskEditDialog task={currentTask} commit={saveTask} close={closeTaskEditDialog} />
      </React.Fragment>
    );
  }
}

export default compose(
  connect(
    state => ({
      tasks: selectors.getTasksListWithReverseTitleOrder(state)
    }),
    { init: actions.init, saveTask: actions.save, removeTask: actions.remove }
  ),
  withStateHandlers(() => ({ currentTask: null }), {
    setCurrentTask: () => task => ({ currentTask: task }),
    closeTaskEditDialog: () => () => ({ currentTask: null })
  })
)(App);
