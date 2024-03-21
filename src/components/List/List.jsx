import React, { useState } from 'react';
import Item from '../Item/Item';
import './List.css';

const List = () => {
  const [items, setItems] = useState([<Item id={Date.now()}/>]);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now()
      },
    ]);
  };

  const handleDeleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className='list-container'>
      <div className='itens-container'>
        {items.map((item) => (
          <div key={item.id} className='container'>
            <Item id={item.id} onDelete={() => handleDeleteItem(item.id)} />
          </div>
        ))}
        <button onClick={handleAddItem}>Adicionar Item na Lista</button>
      </div>
    </div>
  );
};

export default List;