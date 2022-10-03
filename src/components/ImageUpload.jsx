import { useState } from "react";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const removeImg = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      {selectedImage !== null ? (
        <>
          <img className="image__" src={URL.createObjectURL(selectedImage)} />
          <span onClick={removeImg}>x</span>
        </>
      ) : (
        ""
      )}

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default ImageUpload;
