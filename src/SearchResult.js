import styled from 'styled-components';
const ResultUl = styled.ul`
  width: 800px;
  background-color: black;
  padding: 10px;
  li {
    display: flex;
    padding: 5px;
    width: 780px;
    height: 120px;
    background-color: white;
    position: relative;

    img {
      width: 110px;
      height: 110px;
      flex: 1 1 15%;
    }
    .contentsWrapper {
      flex: 1 1 75%;
      .titleNdate {
        margin-right: 100px;
        display: flex;
        span.title {
          margin-right: 10px;
          flex: 1 1 70%;
          font-size: 16px;
          letter-spacing: 0;
        }
        span.date {
          flex: 1 1 30%;
          font-size: 14px;
        }
      }
      .content {
        margin-top: 5px;
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
    }
  }
`;

const SearchResult = ({ searchResult }) => {
  return (
    <>
      <div>검색 결과</div>
      {searchResult.map((el) => {
        return (
          <ResultUl className='SearchResult'>
            <li>
              <img src='' alt='' />
              <div className='contentsWrapper'>
                <div className='titleNdate'>
                  <span className='title'>
                    <a href={el.link}>
                      {el.title
                        .replaceAll('<b>', '')
                        .replaceAll('</b>', '')
                        .replaceAll('&quot;', '')}
                      {/* 아 수정해야지 */}
                    </a>
                  </span>
                  <span className='date'>{el.postdate}</span>
                </div>
                <div className='content'>내용</div>
              </div>
              <button className='material-icons'>favorite</button>
            </li>
          </ResultUl>
        );
      })}
    </>
  );
};
export default SearchResult;
