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

  const handleDoneList = () => {
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
          <div key={item.id} className='item-container'>
            <Item id={item.id} onDelete={() => handleDeleteItem(item.id)} />
          </div>
        ))}
        <div className='buttons-container'>
          <button onClick={handleAddItem}>Add item to List</button>
          <button onClick={handleDoneList}>Finish List</button>
        </div>
      </div>
    </div>
  );
};

export default List;