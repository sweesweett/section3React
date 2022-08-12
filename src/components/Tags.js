import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TagsDiv = styled.div`
  width: 800px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  margin: 10px auto;
  padding: 10px;
  border-radius: 12px;
  span {
    padding: 10px 10px 10px 35px;
    margin: 10px;
    background-color: black;
    position: relative;
    color: white;
    border-radius: 10px;
    cursor: pointer;

    ::after {
      content: '#';
      font-weight: 700;
      letter-spacing: 0;
      color: black;
      line-height: 20px;
      text-align: center;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: white;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;
const TagNavsDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const TagsNavBtn = styled.button`
  cursor: pointer;
  position: relative;

  width: 80px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin: 10px 20px;
  border: none;
  background-color: transparent;
  padding: 0;
  .material-icons {
    /* &.colored {
      filter: drop-shadow(0px 2px 0px red);
      background-color: purple;
    } */
    background-color: ${(props) =>
      props.active === 'active' ? 'black' : '#000000b3'};
    box-shadow: ${(props) =>
      props.active === 'active' && '0px 2px 6px #000000b3'};
    font-size: 50px;
    width: 80px;
    height: 80px;
    /* background-color: black; */
    line-height: 80px;
    border-radius: 50%;
    color: white;
    transition: background-color ease-out 0.5s;
  }
  span:last-child {
    margin-top: 5px;
    font-size: 15px;
    line-height: 15px;
  }
`;
const Tags = ({
  tagExample,
  setTagExample,
  randomTags,
  searchValue,
  setSearchValue,
  addTag,
}) => {
  const [currCategory, setCurrCategory] = useState('음식점');
  const getTags = (e) => {
    let tagList;
    if (e.target.className === 'material-icons') {
      tagList = randomTags(e.target.textContent);
      setCurrCategory(e.target.nextSibling.textContent);
      setTagExample([...tagList]);
    } else {
      return;
    }
  };
  return (
    <div>
      <div>{currCategory} 관련 추천 태그</div>
      <TagsDiv>
        {tagExample.map((el, index) => (
          <span key={index} onClick={addTag}>
            {el}
          </span>
        ))}
      </TagsDiv>
      <TagNavsDiv>
        <TagsNavBtn
          className='navBtn'
          onClick={getTags}
          active={currCategory === '음식점' && 'active'}
        >
          <span className='material-icons'>restaurant</span>
          <span>음식점</span>
        </TagsNavBtn>
        <TagsNavBtn
          className='navBtn'
          onClick={getTags}
          active={currCategory === '카페' && 'active'}
        >
          <span className='material-icons'>local_cafe</span>
          <span>카페</span>
        </TagsNavBtn>
        <TagsNavBtn
          className='navBtn'
          onClick={getTags}
          active={currCategory === '제품' && 'active'}
        >
          <span className='material-icons'>shopping_cart</span>
          <span>제품</span>
        </TagsNavBtn>
        <TagsNavBtn
          className='navBtn'
          onClick={getTags}
          active={currCategory === '여행지' && 'active'}
        >
          <span className='material-icons'>map</span>
          <span>여행지</span>
        </TagsNavBtn>
      </TagNavsDiv>
    </div>
  );
};
export default Tags;
