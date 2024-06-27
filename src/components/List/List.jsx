import React, { useState, useEffect } from 'react';
import Item from '../Item/Item';
import './List.css';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const List = () => {
  const [items, setItems] = useState([{ id: Date.now() }]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lists'));
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push(...doc.data().items);
        });
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items: ', error);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        name: '',
        image: null
      },
    ]);
  };

  const handleDoneList = async () => {
    try {
      const newList = items.map(item => ({ id: item.id, name: item.name, image: item.image}));
      const docRef = await addDoc(collection(db, 'lists'), { items: newList });
      console.log('List saved successfully with ID:', docRef.id);
    } catch (error) {
      console.error('Error saving list: ', error);
    }
  };

  const handleDeleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, data) => {
    setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, ...data } : item));
  };


  return (
    <div className='list-container'>
      <div className='itens-container'>
        {items.map((item) => (
          <div key={item.id} className='item-container'>
            <Item id={item.id} onDelete={() => handleDeleteItem(item.id)} onUpdate={handleUpdateItem} 
              name={item.name}
              image={item.image} />
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