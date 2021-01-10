import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ src, largeImage, openModal }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={src}
        alt=""
        data-largeimage={largeImage}
        className={s.ImageGalleryItemImage}
        onClick={openModal}
      />
    </li>
  );
}

export default ImageGalleryItem;
