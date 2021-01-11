import { Component } from "react";
import imageFetch from "../../image-api/image-api";
import ImageGalleryItem from "../ImageGalleryItem/ImageItem";
import Button from "../Button/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  state = {
    images: [],
    status: "idle",
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.setState({ status: "pending", page: 1, images: [] }, () =>
        this.onFetch(query, this.state.page)
      );
    }
  }

  onFetch = (query, page) => {
    imageFetch(query, page)
      .then((r) =>
        this.setState(({ images }) => ({
          images: [...images, ...r],
          status: "resolved",
        }))
      )
      .then(
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }, 100)
      )
      .catch((error) => this.setState({ error, status: "rejected" }));
  };

  onLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      this.onFetch(this.props.query, this.state.page + 1)
    );
  };

  render() {
    const { images, status, error } = this.state;

    if (status === "idle") {
      return <div></div>;
    }

    if (status === "pending") {
      return (
        <div className={s.Container}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        </div>
      );
    }

    if (status === "rejected") {
      <h2>{error}</h2>;
    }

    if (status === "resolved") {
      return (
        <div className={s.Container}>
          <ul className={s.ImageGallery}>
            {images.map(({ webformatURL, largeImageURL }, index) => (
              <ImageGalleryItem
                src={webformatURL}
                key={index}
                largeImage={largeImageURL}
                openModal={this.props.openModal}
              />
            ))}
          </ul>
          {images.length > 11 && <Button onClick={this.onLoadMore} />}
        </div>
      );
    }
  }
}

export default ImageGallery;
