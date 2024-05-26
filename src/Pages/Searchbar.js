import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Search.css'
const locations = [
  { name: "DHA Lahore", path: "/dha" },
  { name: "Johar Town", path: "/johartown" },
  { name: "Behria Town", path: "/behria" }
];

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setShowSearchResults(query.trim() !== '');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const matchedLocation = locations.find(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedLocation) {
        navigate(matchedLocation.path);
        clearSearch();
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };



  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="searchbar-container">
      <input
        type="search"
        placeholder="Search locations..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      
      {showSearchResults && (
        <div className="search-results">
          {filteredLocations.map((location, index) => (
            <p key={index} className="search-result" onClick={() => { navigate(location.path); clearSearch(); }}>
              {location.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
