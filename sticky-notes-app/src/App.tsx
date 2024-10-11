import React, { useEffect, useState } from 'react';
import './App.css';
import { Label, Note } from './types';
import ToggleTheme from './hooks';

function App() {
  const [lastID, setLastID] = useState<number>(0);
  //Manage the list of notes in state
  const [notes, setNotes] = useState<Note[]>([]);

  // Manage the list of favorite notes in state
  const [favNotesList, setFavNotesList] = useState<number[]>([]);
  const [favTitleList, setFavTitleList] = useState<string[]>([]);

  // Favorite/Unfavorite Note Button
  function ClickHeart({ note }: { note: Note }) {
    // Check if the note is already a favorite initially
    const isFav = favNotesList.includes(note.id);
    const [favNote, setFavNote] = useState(isFav);

    const heartClick = () => {
      setFavNote(!favNote); // Toggle the favorite state
    };

    useEffect(() => {
      if (favNote && !favNotesList.includes(note.id)) {
        // Add to favorites if not already in list
        setFavNotesList((prev) => [...prev, note.id]);
        setFavTitleList((prev) => [...prev, note.title]);
      } else if (!favNote && favNotesList.includes(note.id) ) {
        // Remove from favorites
        setFavNotesList((prev) => prev.filter((checkedNote) => checkedNote !== note.id));
        setFavTitleList((prev) => prev.filter((checkedNote) => checkedNote !== note.title));

      }
    }, [favNote, note.id, favNotesList, favTitleList]);

    return (
      <button
        id="heart"
        onClick={heartClick}
        style={{ color: favNote ? 'red' : 'black' }}
      >
        {favNote ? '❤' : '♡'}
      </button>
    );
  }

  // Create and Save new notes

  const initialNote = {
    id: -1,
    title: '',
    content: '',
    label: Label.other,
  };

  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote = { ...createNote, id: lastID + 1 };
    setLastID(lastID+1);
    setNotes([newNote, ...notes]);
    setCreateNote(initialNote);
  };

  //Delete note
  const deleteNoteHandler = (delNote: Note) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== delNote.id));
    //Delete if it is also in favorite list
    if(favNotesList.includes(delNote.id)){
      setFavNotesList((prevNotes) => prevNotes.filter((note) => note !== delNote.id))
      setFavTitleList((prevNotes) => prevNotes.filter((note) => note !== delNote.title))

    }
  };


  return (
    <div className="App-container">
      <div className="left-side">
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              value={createNote.title}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Note Content"
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              value={createNote.content}
              required
            />
          </div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
            required
          >
            <option value={Label.other}>Other</option>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
          </select>
          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>

        <div className = "theme-button">
            <ToggleTheme/>
        </div>
      </div>
      
      
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <ClickHeart note={note} />
              <button id="close-button" onClick={()=>deleteNoteHandler(note)}>x</button>
            </div>
            <h2 contentEditable="true">{note.title}</h2>
            <p contentEditable="true">{note.content}</p>
            <p contentEditable="true">{note.label}</p>
          </div>
        ))}
      </div>
      
      <div className="fav-list">
        <label>List of favorites:</label>
        <ul>
          {favTitleList.flatMap((noteTitle, index) => (
            <li key={index}>{noteTitle}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
