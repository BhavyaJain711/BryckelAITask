import CreateArea from "../CreateArea"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Create = () => {
    const navigate = useNavigate();
    async function addNote(newNote) {
        console.log(newNote);
        const response = await axios.post('http://localhost:8000/api/notes/', newNote);
        console.log(response);
        alert("Note added successfully");
        navigate('/');
      }
    
  return (
    <>
        <h1 className="text-3xl text-center text-yellow-500">Create a Note</h1>
        <CreateArea onAdd={addNote} />
    </>
  )
}

export default Create