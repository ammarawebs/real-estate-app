import  {useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = ({ imageUrls }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="flex justify-start items-center  gap-4">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Gallery ${index}`}
          className="cursor-pointer w-96 h-60 object-cover "
          onClick={() => openLightbox(index)}
        />
      ))}
      {isOpen && (
        <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={imageUrls.map((url) => ({ src: url }))}
                
        />
      )}
    </div>
  );
};

export default Gallery;
