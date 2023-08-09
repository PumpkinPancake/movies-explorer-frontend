import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function SavedMovies() {
  return (
    <>
      <Header />
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList />
      </section>
      <Footer />
    </>
  );
}
