import { useState, useEffect } from "react";
import React from 'react';
import Autocomplete from "./Autocomplete";
import Airports from "./Airports";

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(Airports.map(item => item.name));
  }, []);


  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const { value } = e;
    setSearchName(value);

    // Filter the JSON data based on the entered name and field
    const filteredResults = Airports.filter((item) =>
      item.name.toLowerCase().includes(e.toLowerCase())
    );
    
    console.log("filteredResults:", filteredResults);
    console.log("ident:", filteredResults[0].ident);

    setSearchResults(filteredResults);
  };


  const handleSuggestionSelected = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    handleSearchChange(selectedValue);
  };

  return (
    <div>
      <h1>React Autocomplete Demo</h1>
      <h2>Start typing and experience the autocomplete wizardry!</h2>
      <Autocomplete suggestions={items} onSuggestionSelected={handleSuggestionSelected}/>
    </div>
  );
}

export default App;
