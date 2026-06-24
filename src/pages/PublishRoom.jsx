import { useState } from "react";
import api from "../api/axios";

function PublishRoom() {

const [id,setId] =
useState("");

const [roomId,setRoomId] =
useState("");

const [password,setPassword] =
useState("");

const publishRoom =
async () => {
try {

await api.put(
"/tournaments/publish-room/${id}",
{
roomId,
roomPassword:password
}
);

alert(
"Room Published"
);

} catch(err) {

alert(
"Publish Failed"
);

}
};

return (

<div><h1>
🔑 Publish Room
</h1><input
placeholder="Tournament ID"
onChange={(e)=>
setId(e.target.value)
}
/>

<input
placeholder="Room ID"
onChange={(e)=>
setRoomId(
e.target.value
)
}
/>

<input
placeholder="Password"
onChange={(e)=>
setPassword(
e.target.value
)
}
/>

<button
onClick={publishRoom}

«»

Publish
</button>

</div>
);
}export default PublishRoom;
