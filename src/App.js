import './App.css';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import Nav from './Nav';
import Search from './Search';
import SearchResult from './SearchResult';
import { useState } from 'react';
const Title = styled.h2`
  font-family: '양진체', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 40px;
  text-shadow: 0px 2px 0px red;
  margin: 30px;
`;
function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Nav />
      <main>
        <Title>SEARCH FOR WHAT?</Title>
        <Search />
        <SearchResult />
      </main>
    </div>
  );
}

export default App;
