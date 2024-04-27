import { useNavigate } from "react-router-dom";
function Note(props) {
  const navigate = useNavigate();
  function handleDelete(event) {
    event.preventDefault();
    confirm("Are you sure you want to delete this note?") &&props.onDelete(props.id);
  }

  function handleEdit(event) {
    event.preventDefault();
    navigate(`/edit/${props.id}`,{state:{id:props.id,title:props.title,content:props.content}});
  }


  return (
    <div className="note border-2 border-solid border-yellow-500">
      <h1 className="text-3xl font-bold">{props.title}</h1>
      <p>{props.content.slice(0, 100) + " ..."}</p>
      <button style={{ width: "auto", backgroundColor: "white",fontWeight:500,color:'red' }} onClick={handleDelete}>DELETE</button>
      <button className="!text-yellow-500 font-bold" style={{ width: "auto", backgroundColor: "white" }} onClick={handleEdit}>View/Edit</button>
    </div>
  );
}

export default Note;
