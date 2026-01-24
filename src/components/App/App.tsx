import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setPhotos([]);
      const data = await getPhotos(query);
      if (data.length === 0) {
        toast.error("No photos found for your request");
        return;
      }
      setPhotos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          {isError && <Text>Something went wrong</Text>}
          {photos.length > 0 && <PhotosGallery photos={photos} />}
        </Container>
      </Section>
      <Toaster />
    </>
  );
}
