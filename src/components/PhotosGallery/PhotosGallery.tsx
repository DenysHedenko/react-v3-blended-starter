import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

export default function PhotosGallery() {
  return (
    <Grid>
      {array.map(() => (
        <GridItem>
          <PhotosGalleryItem />
        </GridItem>
      ))}
    </Grid>
  );
}
