import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Note from '../Note.jsx'
const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/notes/');
        setNotes(response.data);
        console.log(response);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  function handleNew(event) {
    event.preventDefault();
    navigate('/create');
  }
  async function deleteNote(id) {
    console.log(id+"deleted");
    const response = await axios.delete(`http://localhost:8000/api/notes/${id}/`)
    if(response.status===204){
      console.log("Note deleted successfully");
    }
    else{
      alert("Error deleting note");
      return;
    }
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });
  }

  return (
    <>
      <button className='flex flex-col mx-auto justify-center bg-yellow-500 p-4 rounded-2xl text-white' onClick={handleNew}>Create a new Note</button>

      {notes && notes.map((noteItem, index) => {
        return(
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.body}
          onDelete={deleteNote}
        />)
      })}
    </>
  )
}

export default Home