import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = (props) => {
    // const s1 = {
    //     "name": "vishnu",
    //     "class": "10b"
    // }
    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "harsh",
    //             "class": "8b"
    //         })
    //     }, 1000);
    // }
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async() => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },       
        });
       const json = await response.json()
       setNotes(json)
       console.log(json);
    }

    // add Note
    const addNote = async(title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });

        const json = await response.json();
        console.log(json);
        const note = {
            "_id": "640740b85ce12fd29d9b0a65",
            "user": "64073fed5ce12fd29d9b0a5c",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-03-07T13:48:40.668Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }



    // delete Note
    const deleteNote = async(id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);

        console.log("deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }



    // Edit Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/64073fed5ce12fd29d9b0a5c`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {/* value = {{state, update}} */}
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState