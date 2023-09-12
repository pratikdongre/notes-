import React, { useEffect, useRef } from 'react';
import styles from './Popup.module.css';

const Popup = ({
  isPopupOpen,
  groupName,
  setGroupName,
  selectedColor,
  setSelectedColor,
  createNotesGroup,
  closePopup,
}) => {
  const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];
  
  const popupRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the popup
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup(); // Close the popup if the click is outside of it
      }
    };

    // Attach the event listener when the popup is open
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove the event listener when the popup is closed or the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen, closePopup]);

  const handleCreateGroup = () => {
    createNotesGroup();
    closePopup(); // Close the popup after creating the group
  };

  return (
    <>
      {isPopupOpen ? (
        <div className={styles.popup} ref={popupRef}>
          <h2>Create New Notes Group</h2>
          <p>Group Name</p>
          <input
            type="text"
            placeholder="Enter your group name...."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className={styles.sidebar}>
            <p>Choose color</p>
            <ul className={styles.sidebarList}>
              {colors.map((color, index) => (
                <li
                  key={index}
                  className={styles.sidebarListItem}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? '2px solid black' : 'none',
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </ul>
          </div>
          <button className={styles.createBtn} onClick={handleCreateGroup}>
            Create
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Popup;
