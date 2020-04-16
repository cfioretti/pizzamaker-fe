import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PizzaManager from './Containers/PizzaManager/PizzaManager';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme/Theme';

function App() {  

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout title="Pizza Maker">
          <PizzaManager/>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
