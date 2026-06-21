import { useParams } from "react-router-dom";

function Tournament() {
  const { id } = useParams();

  return (
    <div>
      <h1>Tournament Page</h1>

      <p>ID: {id}</p>

      <h3>Room Details</h3>

      <p>Room ID: Not Published</p>
      <p>Password: Not Published</p>

      <h3>Results</h3>

      <p>No Results Yet</p>
    </div>
  );
}

export default Tournament;
