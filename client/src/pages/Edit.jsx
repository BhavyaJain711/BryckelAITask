import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const Edit = () => {
    const [initialNote, setInitialNote] = useState({id: "", title: "", body: ""});//[initialNote, setInitialNote
    const [note, setNote] = useState({id: "", title: "", body: ""});
    const navigate = useNavigate();
    const location= useLocation();
    const state= location.state;
    useEffect(() => {
      setNote({
        id: state.id,
        title: state.title,
        body: state.content
      });
        setInitialNote({
            id: state.id,
            title: state.title,
            body: state.content
        });
    }, [state]);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(note);
        console.log(initialNote);
    // do not edit if no changes made
    if(JSON.stringify(note)===JSON.stringify(initialNote)){
        alert("No changes made");
        return;
      }
        try {
            const response = await axios.put(`http://localhost:8000/api/notes/${note.id}/`, note);
            console.log(response);
            alert("Note updated successfully");
            navigate('/');
        } catch (error) {
            alert(error);
        }
        }

  return (
    <>
    <form >
        <h1>Edit Note</h1>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                required
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-800 rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <div className="mt-1">
              <textarea
                id="content"
                name="content"
                rows={3}
                required
                onChange={(e) => setNote({ ...note, body: e.target.value })}
                value={note.body}
              />
            </div>
          </div>
          <div className="mb-4">
          <button 
          className="inline-flex w-[50px] justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={handleSubmit}
            >
            Save
            </button>
          </div>
          </form>
    </>
  )
}

export default Edit