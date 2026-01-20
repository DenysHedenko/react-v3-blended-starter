import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";
import toast, { Toaster } from "react-hot-toast";



export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const openModal = (photo:Photo) => {
    setSelectedPhoto(photo);
  }
   const closeModal = () => {
     setSelectedPhoto(null);
  }

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const photos = await getPhotos(query);
      if (photos.length === 0) {
        toast.error("No photos found for your request")
      }

      setPhotos(photos);
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
          {isError ? (<><Loader/> <Text>There was an error, please try again...</Text></>) : (photos.length > 0 && <PhotosGallery photos={photos} onPhotoClick={openModal}/>)}
           {selectedPhoto && <Modal photo={selectedPhoto} onClose={closeModal}/> }
        </Container>
      </Section>
      <Toaster/>
    </>
  );
}
