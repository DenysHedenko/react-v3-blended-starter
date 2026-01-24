import type { Photo } from "../../types/photo";
import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  selectedPhoto: (photo: Photo | null) => void;
}

export default function PhotosGalleryItem({
  photo,
  selectedPhoto,
}: PhotosGalleryItemProps) {
  return (
    <div
      className={styles.thumb}
      style={{
        backgroundColor: photo.avg_color,
        borderColor: photo.avg_color,
      }}
      onClick={() => selectedPhoto(photo)}
    >
      <img src={photo.src.large} alt={photo.alt} />
    </div>
  );
}
