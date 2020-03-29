import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PzManager from './Containers/PizzaManager/PizzaManager';

function App() {

  return (
    <div className="App">
      <Layout title="I love Pizza">
        <PzManager/>
      </Layout>
    </div>
  );
}

export default App;
