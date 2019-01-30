//@flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Task } from '../App';
import AppHeader from '../components/app-header';
import GridList from '../components/grid-list';
import { selectors, actions } from '../store/tasks';
import TaskEditDialog from './task-edit-dialog';
import TaskItem from './task-item';

type ContainerProps = {
  init: () => void,
  tasks: Array<Task>,
  saveTask: Task => void,
  removeTask: string => void,
  currentTask: Task | null,
  setCurrentTask: (Task | null) => void,
  closeTaskEditDialog: () => void
};

type State = { editedTask: ?Task };

class App extends React.Component<ContainerProps, State> {
  constructor(props) {
    super(props);
    this.state = { editedTask: null };
    this.setEditedTask = this.setEditedTask.bind(this);
    this.openCreateTaskDialog = this.openCreateTaskDialog.bind(this);
    this.openEditDialog = this.openEditDialog.bind(this);
    this.closeEditDialog = this.closeEditDialog.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  componentDidMount() {
    this.props.init();
  }

  setEditedTask(task: ?Task) {
    this.setState({ editedTask: task });
  }

  openCreateTaskDialog(e: MouseEvent) {
    this.setEditedTask({});
  }

  openEditDialog(e: MouseEvent, t: Task) {
    this.setEditedTask(t);
  }

  closeEditDialog(e: MouseEvent) {
    this.setEditedTask(null);
  }

  completeTask(e: MouseEvent, t: Task) {
    this.props.saveTask({ ...t, completed: true });
  }

  removeTask(e: MouseEvent, t: Task) {
    this.props.removeTask(t.id);
  }

  render() {
    const { tasks, saveTask } = this.props;
    const { editedTask } = this.state;
    return (
      <React.Fragment>
        <AppHeader onAddButtonClick={this.openCreateTaskDialog} />
        <GridList>
          {tasks.map(i => (
            <TaskItem
              key={i.id}
              task={i}
              onDoneButtonClick={this.completeTask}
              onEditButtonClick={this.openEditDialog}
              onRemoveButtonClick={this.removeTask}
            />
          ))}
        </GridList>
        <TaskEditDialog task={editedTask} commit={saveTask} close={this.closeEditDialog} />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    tasks: selectors.getTasksListWithReverseTitleOrder(state)
  }),
  { init: actions.init, saveTask: actions.save, removeTask: actions.remove }
)(App);
