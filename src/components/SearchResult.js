import React, { useState } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import axios from 'axios';
export const ResultUl = styled.ul`
  width: 800px;
  padding: 10px;
  li {
    display: flex;
    padding: 10px 20px;
    width: 780px;
    height: 120px;
    background-color: white;
    border: 1px solid #0909092b;
    border-radius: 5px;
    position: relative;
    .contentsWrapper {
      flex: 1 1 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .titleNdate {
        margin-right: 100px;
        display: flex;
        span.title {
          position: relative;
          margin-right: 10px;
          flex: 1 1 90%;
          font-size: 16px;

          font-weight: 700;
          > a {
            letter-spacing: 1px;
          }
          /* ::after {
            content: '';
            position: absolute;
            width: 0px;
            height: 15px;
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0) 100%
            );
            left: 0;
            top: 5px;
            z-index: 0;
            transition: width 0.8s;
          }
          :hover::after {
            width: 400px;
          } */
        }

        span.date {
          flex: 1 1 10%;
          font-size: 14px;
        }
      }
      .content {
        margin-top: 5px;
        font-size: 14px;
      }
      span.blogName > a {
        font-size: 12px;
        color: #616161;
        letter-spacing: 0;
      }
    }

    button.material-icons {
      letter-spacing: 0px;
      padding: 0;
      text-align: center;
      width: 50px;
      height: 110px;
      font-size: 50px;
      line-height: 110px;
      border: none;
      background-color: transparent;
      flex: 1 1 10%;
      /* animation-name: (${(props) => (props.like ? 'like' : 'none')}); */
      &.like {
        animation: like 0.5s ease-in 1 forwards;
        animation-duration: 0.5s;
        /* animation-timing-function: ease-in;
      animation-iteration-count: 1;
      animation-fill-mode: forwards; */
      }
      @keyframes like {
        0% {
          color: black;
        }
        100% {
          color: red;
          text-shadow: 0px 0px 5px red;
        }
      }
    }
  }
`;

const SearchResult = ({ searchResult, setFavorite, favorite }) => {
  const postFavorite = (a) => {
    console.log(a);
    return axios
      .post('http://localhost:4000/like/', a)
      .then((res) => console.log('perfect'));
  };
  return (
    <>
      <div>검색 결과</div>
      <div>관련도순/최신순</div>
      {searchResult.map((el, index) => {
        return (
          <ResultUl className='SearchResult' key={index}>
            <li>
              {/* <img src='' alt='' /> */}
              <div className='contentsWrapper'>
                <div className='titleNdate'>
                  <span className='title'>
                    <a href={el.link}>
                      {el.title
                        .replaceAll('<b>', '')
                        .replaceAll('</b>', '')
                        .replaceAll('&quot;', '')
                        .replaceAll('&apos;', '')}
                      {/* 아 수정해야지 */}
                    </a>
                  </span>
                  <span className='date'>{el.postdate}</span>
                </div>
                <div className='content'>
                  <a href={el.link}>
                    {el.description
                      .slice(0, 45)
                      .replaceAll('<b>', '')
                      .replaceAll('</b>', '')
                      .replaceAll('&quot;', '')
                      .replaceAll('&apos;', '')
                      .replaceAll('&amp;', '')}
                    ...
                  </a>
                </div>
                <span className='blogName'>
                  <a href={el.bloggerlink}>{el.bloggername}</a>
                </span>
              </div>
              <button
                className='material-icons'
                onClick={(e) => {
                  e.target.classList.toggle('like');
                  const id = uuid();
                  let data = { id, ...el };
                  postFavorite(data);
                }}
              >
                favorite
              </button>
            </li>
          </ResultUl>
        );
      })}
    </>
  );
};
export default React.memo(SearchResult);
