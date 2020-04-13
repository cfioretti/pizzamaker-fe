import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PizzaManager from './Containers/PizzaManager/PizzaManager';

function App() {

  return (
    <div className="App">
      <Layout title="Pizza Maker">
        <PizzaManager/>
      </Layout>
    </div>
  );
}

export default App;
