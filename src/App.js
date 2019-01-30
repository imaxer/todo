//@flow
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import AppContainer from './components/app-container';
import './fonts/index.css';

export type Task = {
  id: string,
  title: ?string,
  description: ?string,
  date: ?string,
  completed: boolean
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12'
    },
    secondary: {
      light: '#5efc82',
      main: '#00c853',
      dark: '#009624'
    },
    error: {
      light: '#ff867f',
      main: '#ff5252',
      dark: '#c50e29'
    }
  },
  appWidth: '600px'
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <div style={{ height: '100vh' }}>
      <AppContainer />
    </div>
  </MuiThemeProvider>
);

export default App;
