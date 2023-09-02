import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('react-notes-app-data')
    const initialValue = JSON.parse(savedNotes)
    return initialValue || []
  });
  const [searchText, setSearchText] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  // useEffect(()=>{    Не работает
  //   const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
  //   if(savedNotes){
  //     setNotes(savedNotes)
  //   }
  // }, [])
  
  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(notes)
    )
  }, [notes])

  const addNote = (text) => {
    const date = new Date()
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
  }
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLocaleLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
