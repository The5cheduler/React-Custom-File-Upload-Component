import React, {useEffect} from 'react'
import './App.css';
import WebFont from 'webfontloader';
import Uploadcare from './Components/Uploadcare'

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['sans-serif', 'Poppins']
      }
    });
   }, []);

  return <Uploadcare/>;
  
}

export default App;
