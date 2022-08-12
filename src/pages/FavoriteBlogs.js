import { ResultUl } from '../components/SearchResult';

const FavoriteBlogs = ({ favorite, setFavorite }) => {
  console.log(favorite, 'test');
  return (
    <>
      <div>블로그 좋아요 리스트</div>
      {favorite.map((el) => {
        return (
          <ResultUl className='SearchResult' key={el.id}>
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
                className='material-icons like'
                onClick={(e) => {
                  e.target.classList.toggle('like');
                  setTimeout(() => {
                    const newArr = favorite.filter(
                      (element) => element.id !== el.id
                    );
                    localStorage.setItem('likeList', JSON.stringify(newArr));
                    setFavorite(newArr);
                  }, 500);
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
export default FavoriteBlogs;
