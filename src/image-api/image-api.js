function imageFetch(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=19671596-fb2ad7f18cbadd6cbe4c4fc90&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(new Error("No response from server"));
    })
    .then((r) =>
      r.hits.map(({ webformatURL, id, largeImageURL }) => ({
        webformatURL,
        id,
        largeImageURL,
      }))
    );
}

export default imageFetch;
