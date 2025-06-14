import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const dummySuggestions = [
    "iphone 13",
    "samsung galaxy s21",
    "laptop",
    "smartwatch",
    "bluetooth headphones",
    "tv",
  ];

  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.toLowerCase();
    return dummySuggestions.filter(
      (item) => item.toLowerCase().indexOf(inputValueLower) > -1
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    console.log("Selected suggestion:", suggestion);
  };

  const renderSuggestion = (suggestion) => {
    return <div className="p-2 z-50">{suggestion}</div>;
  };

  const inputProps = {
    placeholder: "Search for products...",
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    },
  };

  return (
    <div className="bg-zinc-50 text-slate-700 p-2 z-50">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default SearchBar;
