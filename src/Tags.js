import { useEffect } from 'react';
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
    font-size: 50px;
    width: 80px;
    height: 80px;
    background-color: black;
    line-height: 80px;
    border-radius: 50%;
    color: white;
  }
  span:last-child {
    margin-top: 5px;
    font-size: 15px;
    line-height: 15px;
  }
`;
const Tags = ({ tagExample, setTagExample, randomTags }) => {
  const getTags = (e) => {
    let tagList;
    tagList = randomTags(e.target.textContent);
    setTagExample(tagList);
  };
  useEffect(() => {
    setTagExample(randomTags('restaurant'));
  }, []);
  return (
    <div>
      <TagsDiv>
        {tagExample.map((el, index) => (
          <span key={index}>{el}</span>
        ))}
      </TagsDiv>
      <TagNavsDiv>
        <TagsNavBtn className='navBtn' onClick={getTags}>
          <span className='material-icons'>restaurant</span>
          <span>음식점</span>
        </TagsNavBtn>
        <TagsNavBtn className='navBtn' onClick={getTags}>
          <span className='material-icons'>local_cafe</span>
          <span>카페</span>
        </TagsNavBtn>
        <TagsNavBtn className='navBtn' onClick={getTags}>
          <span className='material-icons'>shopping_cart</span>
          <span>제품</span>
        </TagsNavBtn>
        <TagsNavBtn className='navBtn' onClick={getTags}>
          <span className='material-icons'>map</span>
          <span>여행지</span>
        </TagsNavBtn>
      </TagNavsDiv>
    </div>
  );
};
export default Tags;
