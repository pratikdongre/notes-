import React, { useState } from 'react';
import styles from '../Webpage View/WebNotesApp.module.css';
import lock from '../../assets/Vector.png';
import bgImage from '../../assets/bgimage.png';
import createGroupIcon from '../../assets/+.png';
import saveIcon from '../../assets/save.png';
import Popup from '../Webpage View/Popup';

const WebNotes= () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#B38BFA');
  const [noteGroups, setNoteGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const createNotesGroup = () => {
    if (groupName && selectedColor) {
      const newNoteGroup = {
        name: groupName,
        color: selectedColor,
        notes: [],
      };

      // Assign background color based on the first two letters of the group name
      const bgColor = groupName.substring(0, 2).toUpperCase();
      newNoteGroup.backgroundColor = bgColor;

      // Create a copy of noteGroups with the new group
      const updatedNoteGroups = [...noteGroups, newNoteGroup];

      // Update the state with the new array
      setNoteGroups(updatedNoteGroups);

      closePopup();
      setGroupName('');
      setSelectedColor('#B38BFA');
    }
  };


  const selectGroup = (group, index) => {
    console.log('Selected Group Index:', index);
    setSelectedGroup(group);
    setSelectedGroupIndex(index);
    updateLocalStorage(noteGroups);
  };

  const updateLocalStorage = (updatedNoteGroups) => {
    localStorage.setItem('noteGroups', JSON.stringify(updatedNoteGroups));
  };

  const createNote = (noteContent) => {
    if (selectedGroup) {
      const timestamp = new Date();
      const formattedTime = timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const formattedDate = timestamp.toLocaleDateString([], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const noteTimestamp = `${formattedTime} <br/> ${formattedDate}`;

      const newNote = {
        updatedAt: noteTimestamp,
        content: noteContent,
      };

      // Create a copy of notes for the selected group with the new note
      const updatedNotes = [...selectedGroup.notes, newNote];

      // Update the state with the new notes
      setSelectedGroup({ ...selectedGroup, notes: updatedNotes });

      // Save the updated notes to local storage
      const updatedNoteGroups = noteGroups.map((group) => {
        if (group === selectedGroup) {
          return { ...group, notes: updatedNotes };
        }
        return group;
      });

      // Update noteGroups state and save to local storage
      setNoteGroups(updatedNoteGroups);
      updateLocalStorage(updatedNoteGroups);
    }

    setNewNoteContent(''); // Clear the input field after saving
  };

  function generateCircleWithInitials(group) {
    return (
      <div className={styles.circleWrapper}>
        <div
          style={{ backgroundColor: group.color }}
          className={styles.initialCircle}
        >
          {group.name.includes(' ')
            ? group.name
                .split(' ')
                .map((word) => word.slice(0, 1))
                .join('')
                .toUpperCase()
            : group.name.slice(0, 2).toUpperCase()}
        </div>
      </div>
    );
  }

  const handleNoteSave = () => {
    if (newNoteContent.trim() !== '') {
      createNote(newNoteContent); // Call the function to create a new note
    }
  };

  return (
    <div className={styles.chatApp}>
      <div className={styles.noteGroups}>
        <div className="group-container">
          <h1>Pocket Notes</h1>
          <button className={styles.button} onClick={openPopup}>
            <img src={createGroupIcon} alt="Create Group" />
            Create Notes group
          </button>
          <ul className={styles.groupList}>
            {noteGroups.map((group, index) => (
              <li
                key={index}
                className={`${styles.groupItem} ${
                  index === selectedGroupIndex ? styles.selectedGroup : ''
                }`}
                onClick={() => selectGroup(group, index)}
              >
                {generateCircleWithInitials(group)}
                <div className={styles.groupNameTransparent}>{group.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.Content}>
        {isPopupOpen ? (
          // Render popup content when isPopupOpen is true
          <Popup
            isPopupOpen={isPopupOpen}
            closePopup={closePopup}
            groupName={groupName}
            setGroupName={setGroupName}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            createNotesGroup={createNotesGroup}
          />
        ) : selectedGroup ? (
          // Render selected group content when a group is selected
          <div className={styles.rightContent}>
            <div className={styles.logo}>
              {generateCircleWithInitials(selectedGroup)}
            </div>
            <h2>{selectedGroup.name}</h2>


             
            <ul className={styles.noteList}>
              {selectedGroup.notes.map((note, index) => (
                <li key={index} className={styles.noteItem}>
                  {note.content}{' '}
                  <span>
                    <p dangerouslySetInnerHTML={{ __html: note.updatedAt }}></p>
                  </span>
                </li>
               
              

              ))}
            </ul>


            <textarea
              className={styles.noteTextArea}
              contentEditable="true"
              placeholder="   Enter your text here..........."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleNoteSave();
                }
              }}
            />
            <button className={styles.saveButton} onClick={handleNoteSave}>
              <img src={saveIcon} alt="Save Note" />
            </button>
          </div>
        ) : (
          // Render default content when neither popup is open nor a group is selected
          <div className={styles.defaultContent}>
            <img src={bgImage} alt={bgImage} className={styles.bgImage} />
            <p className={styles.pocketnotes}>Pocket Notes</p>
            <p className={styles.description}>
              Send and receive Texts without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div className={styles.FooterContainer}>
              <img src={lock} alt="lock" />
              <p>end-to-end encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebNotes;
