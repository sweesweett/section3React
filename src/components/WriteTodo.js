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
  background-color: black;
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
  textarea {
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
  const title = useRef();
  const content = useRef();
  const handleSubmit = () => {
    const id = uuid();
    const data = {
      id,
      title: title.current.value,
      content: content.current.value,
    };
    axios
      .post('http://localhost:4000/todo', data)
      .then(({ data }) => {
        console.log(data);
        setToDoData(data);
      })
      .catch((err) => alert('글을 등록하지 못했어요!'));
  };
  return (
    <WriteDiv>
      <label htmlFor='writeTitle'>제목</label>
      <input type='text' id='writeTitle' className='title' ref={title} />
      <label htmlFor='writeContent'>내용</label>
      <textarea
        id='writeContent'
        name=''
        cols='50'
        rows='10'
        className='content'
        ref={content}
      ></textarea>
      <button onClick={handleSubmit}>등록</button>
    </WriteDiv>
  );
};
export default WriteTodo;
