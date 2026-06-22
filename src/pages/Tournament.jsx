import { useEffect, useState } from "react";
import API from "../services/api";

function Tournament() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/tournaments")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Tournament Page</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default Tournament;
