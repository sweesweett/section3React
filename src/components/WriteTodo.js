import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import styled from 'styled-components';

const WriteDiv = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding-top: 10px;
  border-radius: 5px;
  label {
    color: white;
    margin: 5px 50px;
  }
  input {
    width: 90%;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: 2px solid black;
    margin: auto;
  }
  select {
    width: 90%;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    margin: auto;
    resize: none;
  }
  button {
    width: 50px;
    align-self: flex-end;
    margin-right: 40px;
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 5px;
    border: none;
    background-color: white;
    border-radius: 10px;
    font-weight: 700;
  }
`;

const WriteTodo = ({ setToDoData }) => {
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/like')
      .then(({ data }) => setFavorite(data));
  }, []);
  const memo = useRef();
  const likeChoice = useRef();
  const handleSubmit = () => {
    const id = uuid();
    const createdAt = new Date().getTime();
    const data = {
      id,
      memo: memo.current.value,
      likeContent: {
        ...favorite.filter((el) => el.id === likeChoice.current.value)[0],
      },
    };
    axios
      .post('http://localhost:4000/todo', data)
      .then(({ data }) => {
        console.log(data);
        setToDoData(data);
      })
      .catch((err) => alert('글을 등록하지 못했어요!'));
    console.log(createdAt);
  };
  return (
    <WriteDiv>
      <label htmlFor='writeMemo'>메모</label>
      <input type='text' id='writeMemo' ref={memo} />
      <label htmlFor='writeSelect'>좋아요 리스트</label>
      <select name='' id='' ref={likeChoice}>
        {favorite.map((el, index) => (
          <option key={index} value={el.id}>
            {el.title
              .replaceAll('<b>', '')
              .replaceAll('</b>', '')
              .replaceAll('&quot;', '')
              .replaceAll('&apos;', '')}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>등록</button>
    </WriteDiv>
  );
};
export default WriteTodo;
