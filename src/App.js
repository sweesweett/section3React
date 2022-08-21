import './App.css';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import Nav from './components/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FavoriteBlogs from './pages/FavoriteBlogs';
import ToDoList from './pages/ToDoList';
const Title = styled.h2`
  font-family: '양진체', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 40px;
  text-shadow: 0px 2px 0px red;
  margin: 30px;
`;
function App() {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    axios
      .get(` http://localhost:4000/search/blog?query="코드스테이츠"`)

      .then(({ data }) => setSearchResult(data.items))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='App'>
      <GlobalStyle />
      <Nav />
      <main>
        <Title onClick={() => navigate('/')}>SEARCH FOR WHAT?</Title>
        <Routes>
          <Route
            path='/'
            element={
              <SearchPage
                setSearchResult={setSearchResult}
                searchResult={searchResult}
                setFavorite={setFavorite}
                favorite={favorite}
              />
            }
          />
          <Route
            path='/like'
            element={
              <FavoriteBlogs favorite={favorite} setFavorite={setFavorite} />
            }
          />
          <Route
            path='/todo'
            element={<ToDoList setFavorite={setFavorite} favorite={favorite} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
