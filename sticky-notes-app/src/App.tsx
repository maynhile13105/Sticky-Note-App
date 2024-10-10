import React from 'react';
import './App.css';
import { Label, Note } from './types';
import { dummyNotesList } from './constants';
import ClickHeart from "./hooks";

function App() {
  return (
    <div className="App-container">

      <form className="note-form">
        <div><textarea placeholder='Note title'></textarea></div>
        <div><textarea placeholder='Note Content'></textarea></div>
        <select>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
        <div><button type='submit'>Create Note</button></div>
      </form>

      <div className = 'notes-grid'>
        {dummyNotesList.map((note)=>(
          <div
            key = {note.id}
            className = "note-item"
          >
            <div className = "note-header">
              <ClickHeart/>
              <button id='close-button'>x</button>
            </div>

            <h2>{note.title}</h2>

            <p>{note.content}</p>

            <p>{note.label}</p>
          </div>
        ))}  
      </div>

    </div>
  );
}

export default App;
