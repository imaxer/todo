//@flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import AppContainer from './components/container';
import './fonts/index.css';

export type Task = {
  id: string,
  title: ?string,
  description: ?string,
  date: ?string
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  appWidth: '600px'
});

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ height: '100vh' }}>
            <AppContainer />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
