//@flow
import * as React from 'react';
import type { FormikProps } from 'formik';
import type { Task } from '../App';
import pure from 'recompose/pure';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Dialog from '@material-ui/core/Dialog/Dialog';

type TaskEditDialogProps = {
  task: Task | null,
  close: () => void,
  commit: Object => void
};

const validate = values => {
  let errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  return errors;
};

const TaskEditDialog = ({ task, close, commit }: TaskEditDialogProps) => (
  <Dialog open={!!task} onClose={close}>
    <Formik
      initialValues={task}
      validate={validate}
      onSubmit={values => {
        commit({ ...values, date: new Date().toISOString(), completed: false });
        close();
      }}
    >
      {({ values: { id, title = '', description = '' }, handleChange, handleSubmit, errors, isValid }): FormikProps => (
        <React.Fragment>
          <DialogTitle>{id ? 'Update task' : 'Create task'}</DialogTitle>
          <DialogContent>
            <TextField
              name="title"
              value={title}
              onChange={handleChange}
              label="Title"
              fullWidth
              required
              error={!!errors.title}
              helperText={errors.title || ' '}
            />
            <TextField
              name="description"
              value={description}
              onChange={handleChange}
              multiline
              rows={5}
              label="Description"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleSubmit} disabled={!isValid}>
              Save
            </Button>
            <Button color="secondary" onClick={close}>
              Cancel
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Formik>
  </Dialog>
);

export default pure(TaskEditDialog);
