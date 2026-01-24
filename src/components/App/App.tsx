import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

export default function App() {
  const [images, setImages] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [querySearch, setQuerySearch] = useState("");
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!querySearch.trim()) return;
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { photos, total_results, per_page } = await getPhotos(
          querySearch,
          page,
        );
        if (photos.length === 0) {
          toast.error("No photos found for your request");
          return;
        }
        setImages((prev) => [...prev, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [querySearch, page]);

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSearch = (query: string) => {
    setIsError(false);
    setImages([]);
    setPage(1);
    setQuerySearch(query);
    setIsVisible(false);
  };

  const handleSelectPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
    console.log(photo);
  };
  console.log(isVisible);

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          {isError && <Text>Something went wrong</Text>}
          {images.length > 0 && (
            <PhotosGallery photos={images} selectedPhoto={handleSelectPhoto} />
          )}
          {isVisible && (
            <Button onClick={onLoadMore} disabled={isLoading}>
              {isLoading ? "Loading" : "Load more"}
            </Button>
          )}

          {selectedPhoto && (
            <Modal onClose={() => handleSelectPhoto(null)}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}
        </Container>
      </Section>
      <Toaster />
    </>
  );
}
