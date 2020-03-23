import React from 'react';
import './App.css';
import AppBar from './Components/AppBar';
import PanList from './Components/PanList';
import Button from '@material-ui/core/Button';

function App() {
  const [activity, setActivity] = React.useState();

  const clickHandler = (event) => {
    setActivity("addPan");
  }

  return (
    <div className="App">
      <header className="App-header">
      <AppBar pageName="I love Pizza"/>
      </header>
      <body>
        <PanList />
        {activity === "addPan" ? <h1>Sto aggiungendo una padella</h1> : <h1>Sto per salvare il contenuto</h1>}
        <Button size="medium" color="primary" variant="contained" onClick={clickHandler}>Calcola ingredienti</Button>
      </body>
    </div>
  );
}

export default App;
