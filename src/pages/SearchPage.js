import Search from '../components/Search';
import SearchResult from '../components/SearchResult';

const SearchPage = ({
  setSearchResult,
  searchResult,
  setFavorite,
  favorite,
}) => {
  return (
    <>
      <Search setSearchResult={setSearchResult} />
      <SearchResult
        searchResult={searchResult}
        setFavorite={setFavorite}
        favorite={favorite}
      />
    </>
  );
};

export default SearchPage;
