import { ResultUl } from '../components/SearchResult';
import axios from 'axios';
import { useEffect } from 'react';
const FavoriteBlogs = ({ favorite, setFavorite }) => {
  useEffect(() => {
    axios
      .get('http://localhost:4000/like')
      .then(({ data }) => setFavorite(data));
  }, []); ///쓰읍애매
  const deleteLike = async (id) => {
    return await axios
      .delete(`http://localhost:4000/like/${id}`)
      .then(({ data }) => setFavorite(data));
  };

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
                  return deleteLike(el.id);
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
