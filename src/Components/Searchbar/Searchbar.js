import { Component } from "react";
import s from "./Searchbar.module.css";

class SearchBar extends Component {
  state = {
    query: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.query === "") {
      return alert("Enter search query");
    }
    this.props.onSubmit(this.state.query);
  };

  onInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
