import { useState } from "react";
import api from "../api/axios";

function PublishResults() {

const [id,setId] =
useState("");

const [results,setResults] =
useState("");

const publishResults =
async () => {
try {

await api.put(
"/tournaments/results/${id}",
{
results
}
);

alert(
"Results Published"
);

} catch(err) {

alert(
"Publish Failed"
);

}
};

return (

<div><h1>
🥇 Publish Results
</h1><input
placeholder="Tournament ID"
onChange={(e)=>
setId(e.target.value)
}
/>

<textarea
placeholder="Results"
onChange={(e)=>
setResults(
e.target.value
)
}
/>

<button
onClick={
publishResults
}
>
Publish
</button>

</div>
);
}

export default PublishResults;
