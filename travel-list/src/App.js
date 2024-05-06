import React, { useState } from "react";
function App() {
  const [item, setItem] = useState({
    packageCount: "1",
    packageItem: "",
    // isChecked: false,
  });
  const [itemList, setItemList] = useState([]);
  console.log(itemList);

  function handleChange(event, selectedItemIndex) {
    // console.log(item);
    const { name, value, checked } = event.target;
    setItem((prevItems) => ({ ...prevItems, [name]: value, isChecked: checked }));

    const itemListAfterUpdate = itemList.map((item, index) =>
      index === selectedItemIndex
        ? { ...item, isChecked: checked, id: index + 1 }
        : { ...item, id: index + 1 }
    );
    setItemList(itemListAfterUpdate);
  }
  function handleAddItem(event) {
    event.preventDefault();
    setItemList((prevItemList) => [...prevItemList, item]);
  }
  function handleDeleteItem(selectedItemIndex) {
    const itemListAfterDelete = itemList.filter((item, index) => index !== selectedItemIndex);
    setItemList(itemListAfterDelete);
  }
  function handleSortItems(event) {
    const { value } = event.target;
    let sortedItemList;
    if (value === "inputOrder") {
      sortedItemList = itemList.slice().sort((a, b) => a.id - b.id);
    } else if (value === "description") {
      sortedItemList = itemList.slice().sort((a, b) => a.packageItem.localeCompare(b.packageItem));
    } else {
      sortedItemList = itemList.slice().sort((a, b) => a.isChecked - b.isChecked);
    }
    console.log(sortedItemList);
    setItemList(sortedItemList);
  }
  function handleClearList() {
    setItemList([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} handleChange={handleChange} />
      <PackingList
        itemList={itemList}
        handleDeleteItem={handleDeleteItem}
        handleChange={handleChange}
        handleSortItems={handleSortItems}
        handleClearList={handleClearList}
      />
      <Stats itemList={itemList} />
    </div>
  );
}

export default App;

function Logo() {
  return (
    <div>
      <h1>🌴 Far Away 💼</h1>
    </div>
  );
}
function Form({ handleAddItem, handleChange }) {
  return (
    <form className="add-form" onSubmit={handleAddItem}>
      <h3>What do you need for your 😍 trip?</h3>
      <select name="packageCount" onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <input type="text" name="packageItem" placeholder="Item..." onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}
function PackingList({
  itemList,
  handleDeleteItem,
  handleChange,
  handleSortItems,
  handleClearList,
}) {
  return (
    <div className="list">
      {itemList.length > 0 && (
        <ul>
          {itemList.map((item, key) => (
            <Item
              key={item.packageItem}
              itemInfo={item}
              itemIndex={key}
              handleDeleteItem={handleDeleteItem}
              handleChange={handleChange}
            />
          ))}
        </ul>
      )}

      <div className="actions">
        <select name="sort" onChange={handleSortItems}>
          <option value="inputOrder">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packedStatus">Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear list</button>
      </div>
    </div>
  );
}
function Stats({ itemList }) {
  const totalItemCount = itemList.length > 0 ? itemList.length : 0;
  const checkedItemCount = itemList.filter((item) => item.isChecked).length;
  const packedPercent = Math.round((checkedItemCount * 100) / totalItemCount);

  return (
    <footer className="stats">
      <em>
        💼You have {totalItemCount} items on your list, and you already packed {checkedItemCount} (
        {packedPercent}%)
      </em>
    </footer>
  );
}

function Item({ itemInfo, itemIndex, handleDeleteItem, handleChange }) {
  return (
    <li>
      <input type="checkbox" name="isChecked" onChange={(e) => handleChange(e, itemIndex)} />
      <span>{itemInfo.packageCount}</span>
      <span>{itemInfo.packageItem}</span>
      <button onClick={() => handleDeleteItem(itemIndex)}>&times;</button>
    </li>
  );
}
