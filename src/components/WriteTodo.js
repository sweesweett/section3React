import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import styled from 'styled-components';

const WriteDiv = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  border-radius: 5px;
  background-color: 060606;
  position: relative;
  label {
    margin: 10px 0 10px 5%;
    font-weight: 700;
    font-size: 14px;
  }
  input {
    width: 90%;
    padding: 5px;
    outline: none;
    border: none;
    border-bottom: 2px dashed black;
    margin: auto;
    :focus {
      background-color: #eceff1;
    }
  }
  select {
    width: 50%;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: none;
    margin-left: 5%;
    resize: none;
  }
  button {
    width: 50px;
    /* align-self: flex-end;
    margin-right: 40px;
    margin-bottom: 10px;
    margin-top: 10px; */
    padding: 5px;
    border: none;
    background-color: white;
    border-radius: 10px;
    font-weight: 700;
    position: absolute;
    bottom: 10px;
    right: 30px;
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
      createdAt,
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
      <label htmlFor='writeSelect'>관련 포스트</label>
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
      <button className='material-icons' onClick={handleSubmit}>
        check
      </button>
    </WriteDiv>
  );
};
export default WriteTodo;
