import './App.css';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import Nav from './Nav';
import Search from './Search';
import SearchResult from './SearchResult';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Title = styled.h2`
  font-family: '양진체', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 40px;
  text-shadow: 0px 2px 0px red;
  margin: 30px;
`;
function App() {
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    axios
      .get(` http://localhost:4000/search/blog?query="강남 맛집"`)

      .then(({ data }) => setSearchResult(data.items))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className='App'>
      <GlobalStyle />
      <Nav />
      <main>
        <Title>SEARCH FOR WHAT?</Title>
        <Search />
        <SearchResult searchResult={searchResult} />
      </main>
    </div>
  );
}

export default App;
