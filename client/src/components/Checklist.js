import React, { useState, useEffect, useRef } from "react";
import "../App.css";

// ChatGPT contributed significantly to this code

const Checklist = () => {
  const [editItemId, setEditItemId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([
    { id: 1, text: "Item 1", checked: false, subItems: [] },
    { id: 2, text: "Item 2", checked: false, subItems: [] },
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        whenClickedAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const whenClickedOn = (id) => {
    if (editItemId === id) {
      return;
    }
    setEditItemId(id);
  };

  const whenClickedAway = () => {
    setEditItemId(null);
  };

  const updateText = (id, newText, parentId = null) => {
    if (parentId === null) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, text: newText } : item
        )
      );
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === parentId
            ? {
                ...item,
                subItems: item.subItems.map((subItem) =>
                  subItem.id === id ? { ...subItem, text: newText } : subItem
                ),
              }
            : item
        )
      );
    }
  };

  const toggleChecked = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const createNewListItem = () => {
    const newListItem = {
      id: items.length + 1,
      text: inputText,
      checked: false,
      subItems: [],
    };
    setItems([...items, newListItem]);
    setInputText("");
    setEditItemId(newListItem.id);
  };

  const createNewSubItem = (parentId) => {
    const parentItemIndex = items.findIndex((item) => item.id === parentId);
    if (parentItemIndex !== -1) {
      const newSubItem = {
        id: items[parentItemIndex].subItems.length + 1,
        text: inputText,
      };
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[parentItemIndex].subItems.push(newSubItem);
        return updatedItems;
      });
      setInputText("");
      setEditItemId(newSubItem.id);
    }
  };

  return (
    <div>
      <ul className="checkList">
        {items.map((item) => (
          <li key={item.id} onClick={() => whenClickedOn(item.id)}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleChecked(item.id)}
            />
            {editItemId == item.id ? (
              <input
                type="text"
                value={item.text}
                onChange={(e) => updateText(item.id, e.target.value)}
                onBlur={whenClickedAway}
                ref={inputRef}
              />
            ) : (
              <span className={item.checked ? "checkedItem" : ""}>
                {item.text}
              </span>
            )}
            <ul>
              {item.subItems.map((subItem) => (
                <li key={subItem.id}>{subItem.text}</li>
              ))}
              <li>
                <button onClick={() => createNewSubItem(item.id)}>
                  Add Sub Item
                </button>
              </li>
            </ul>
            {/* {!editItemId || editItemId !== item.id ? item.text : null} */}
          </li>
        ))}

        <li className="addCheckListItem" onClick={createNewListItem}>
          +
        </li>
      </ul>
    </div>
  );
};

export default Checklist;