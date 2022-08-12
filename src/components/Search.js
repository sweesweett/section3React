import styled from 'styled-components';
import Tags from './Tags';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const SearchDiv = styled.div`
  padding: 10px;
  .searchWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    position: relative;
    label {
      margin: 10px;
      font-size: 20px;
      font-weight: 700;
      flex: 1 1 7%;
    }
    span#searchBtn {
      margin: 10px;
      font-size: 50px;
      font-weight: 700;
      cursor: pointer;
      flex: 1 1 8%;
    }
    span#clearBtn {
      position: absolute;
      padding: 2px;
      right: 100px;
      color: white;
      background-color: black;
      border-radius: 50%;
      cursor: pointer;
      opacity: ${(props) => (props.clear === 'yes' ? '1' : '0')};
      transition: opacity ease-out 0.3s;
    }
    input {
      flex: 1 1 85%;
      margin: 10px auto;
      width: 650px;
      padding: 20px;
      border-radius: 12px;
      font-size: 20px;
      border: 5px solid black;
      filter: text-shadow(0px 2px 0px red);
    }
  }
`;

const Search = ({ setSearchResult }) => {
  // let defaultTag = () => {};

  const [searchValue, setSearchValue] = useState('');
  const inputVal = useRef();
  // useEffect
  const tag = {
    restaurant: [
      '맛집',
      '추천',
      '내돈내산',
      '존맛',
      '짱맛',
      '대존맛',
      '친구',
      '남친',
      '여친',
      '가족',
      '분위기',
      '오지는',
      '가성비',
      '미쳤음',
      '로컬추천',
    ],
    local_cafe: [
      '카페',
      '커피',
      '커피맛',
      '베이커리',
      '사진',
      '미쳤음',
      '사진찍기',
      '인생샷',
      '친구',
      '분위기',
      '내돈내산',
    ],
    shopping_cart: [
      '추천',
      '내돈내산',
      '가성비',
      '친구선물',
      '실사용기',
      '1달 사용',
    ],
    map: [
      '여행지',
      '뷰개쩌는',
      '남친',
      '여친',
      '친구',
      '가족',
      '분위기좋은',
      '아늑한',
      '가성비',
      '사진',
      '포토스팟',
      '조용한',
      '뷰좋은',
      '내돈내산',
    ],
  };
  const randomTags = (t) => {
    let result = [];
    if (t === 'shopping_cart') {
      return [...tag[t]];
    }
    for (let i = 0; i < 10; i++) {
      let tmp = tag[t][Math.floor(Math.random() * tag[t].length)];
      if (result.includes(tmp) === false) {
        result.push(tmp);
        if (result.length === 5) {
          return result;
        }
      }
    }
  };

  const addTag = (e) => {
    setSearchValue(`${searchValue} ${e.target.textContent}`);
    setTagExample(tagExample.filter((el) => el !== e.target.textContent));
    inputVal.current.value = `${searchValue} ${e.target.textContent}`;
  };
  const [tagExample, setTagExample] = useState([...randomTags('restaurant')]);
  const handleClearSearch = () => {
    inputVal.current.value = '';
    setSearchValue('');
  };
  const handleinput = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      onSearch();
    } else {
      setSearchValue(e.target.value);
    }
  };
  const onSearch = async () => {
    if (searchValue === '') {
      return;
    }
    // let uri = encodeURI(searchValue);
    // console.log(uri);
    const result = await axios
      .get(` http://localhost:4000/search/blog?query=${searchValue}`)

      .then(({ data }) => {
        console.log(data.items);
        return setSearchResult(data.items);
      })
      .catch((err) => alert('오류가 발생했습니다. 잠시 후에 시도해 주세요'));
  };
  return (
    <SearchDiv className='Search' clear={searchValue !== '' ? 'yes' : 'no'}>
      <div className='searchWrapper'>
        <label htmlFor='searchInput'>검색</label>
        <input
          type='text'
          id='searchInput'
          placeholder='검색할 내용을 입력해주세요'
          onKeyUp={handleinput}
          ref={inputVal}
        />
        {/* {searchValue !== '' && ( */}
        <span class='material-icons' id='clearBtn' onClick={handleClearSearch}>
          clear
        </span>
        {/* )} */}
        <span className='material-icons' id='searchBtn' onClick={onSearch}>
          search
        </span>
      </div>
      <Tags
        tagExample={tagExample}
        setTagExample={setTagExample}
        randomTags={randomTags}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        addTag={addTag}
      />
    </SearchDiv>
  );
};

export default React.memo(Search);
