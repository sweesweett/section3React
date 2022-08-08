import styled from 'styled-components';
const ResultUl = styled.ul`
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
      .titleNdate {
        margin-right: 100px;
        display: flex;
        span.title {
          margin-right: 10px;
          flex: 1 1 90%;
          font-size: 16px;
          letter-spacing: 0;
          font-weight: 700;
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
                    {' '}
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
