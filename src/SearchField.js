import './App.css';
import React, { useState, useEffect } from "react";

const SearchField = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [matchedItems, setMatchedItems] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const matched = items.filter(item =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );

    setMatchedItems(matched);
  };

  const handleItemClick = (item) => {
    setInputValue(item);
    setMatchedItems([]);
  };

  return (
    <div><input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <ul>
        {matchedItems.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchField;