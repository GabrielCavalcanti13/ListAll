import React, { useState } from 'react';
import imageDefault from '../../assets/image_default.jpg';
import './Item.css';

const Item = ({id, onDelete}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  
  const handleInputChange = (e) => {a
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
  };

  return (
    <div>
      <div>
        <label htmlFor={`imageInput_${id}`}>
          {selectedImage ? (
            <img src={selectedImage} alt="Imagem Selecionada" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          ) : (
            <img src={imageDefault} alt="Imagem Selecionada" style={{ maxWidth: '100%', maxHeight: '200px' }} />
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
        placeholder="Digite algo..."
      />
      <button onClick={onDelete}>Deletar</button>
    </div>
  );
};

export default Item;