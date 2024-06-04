import React, { useState } from 'react';
import imageDefault from '../../assets/image_default.png';
import './Item.css';

const Item = ({id, onDelete}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setImageHovered(false)
  };

  const handleInputFocused = (e) => {
    setInputFocused(true);
  };

  const handleInputBlur = (e) => {
    setInputFocused(false);
  };

  const handleImageHovered = (e) => {
    setImageHovered(true);
  };

  const handleImageLeaved = (e) => {
    setImageHovered(false);
  };

  const handleEditImage = (e) => {
    document.getElementById(`imageInput_${id}`).click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <div className='item-container'>
      <div className='image-container' onMouseEnter={handleImageHovered} onMouseLeave={handleImageLeaved} style={{ position: 'relative' }}>
          {imageHovered && (
            <div style={{ position: 'absolute', top: '5px', right: '5px'}}>
              <button onClick={onDelete}>Delete Item</button>
            </div>
          )}
          {selectedImage && imageHovered && (
            <div style={{ position: 'absolute', top: '5px', right: '5px'}}>
              <button onClick={handleEditImage}>Edit Image</button>
              <button onClick={onDelete}>Delete Item</button>
          </div>
          )}
        <label htmlFor={`imageInput_${id}`}>
          {selectedImage ? (
            <div>
               <img className='image' src={selectedImage} alt="Imagem Selecionada" />
            </div>
          ) : (
            <img className='image' src={imageDefault} alt="Selected Image" />
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id={`imageInput_${id}`}
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={isInputFocused ? 'inputFocused' : 'inputNotFocused'}
        placeholder="Name..."
      />
    </div>
  );
};

export default Item;