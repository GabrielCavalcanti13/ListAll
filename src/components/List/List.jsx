import React, { useState } from 'react';
import Item from '../Item/Item';
import './List.css';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const List = () => {
  const [items, setItems] = useState([{ id: Date.now() }]);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now()
      },
    ]);
  };

  const handleDoneList = async () => {
    try {
      const newList = items.map(item => ({ id: item.id }));
      const docRef = await addDoc(collection(db, 'lists'), { items: newList });
      console.log('List saved successfully with ID:', docRef.id);
    } catch (error) {
      console.error('Error saving list: ', error);
    }
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