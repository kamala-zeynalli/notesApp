import { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "first note",
      date: "22/02/2022",
    },
    {
      id: nanoid(),
      text: "second note",
      date: "22/02/2022",
    },
    {
      id: nanoid(),
      text: "third note",
      date: "22/02/2022",
    },
    {
      id: nanoid(),
      text: "new note",
      date: "23/02/2022",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkkMode] = useState(false);

  useEffect(() => {
    const saveNotes = JSON.parse(localStorage.getItem("my-app-data"));
    if (saveNotes) {
      setNotes(saveNotes);
    }
  }, []); 

  useEffect(() => {
    //save our notes to local storage anytime the notes change
    localStorage.setItem("my-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }; 

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDrakMode={setDarkkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        /> 
      </div>
    </div>
  );
};

export default App;
