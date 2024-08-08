import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Asset/Theme';
import CurrencyExchange from './Component/CurrencyExchange';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CurrencyExchange />
    </ThemeProvider>
  );
}

export default App;
