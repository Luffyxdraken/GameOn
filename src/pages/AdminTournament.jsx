import { useState } from "react";
import api from "../api/axios";

function AdminTournament() {

const [form, setForm] =
useState({
title:"",
type:"solo",
description:"",
prizePool:0,
entryFee:0,
totalSlots:12,
startTime:""
});

const createTournament =
async () => {
try {

await api.post(
"/tournaments/create",
form
);

alert(
"Tournament Created"
);

} catch(err) {

alert(
"Creation Failed"
);

}
};

return (

<div
style={{
minHeight:"100vh",
background:"#08142e",
color:"white",
padding:"20px"
}}
><h1>🏆 Create Tournament</h1><input
placeholder="Title"
onChange={(e)=>
setForm({
...form,
title:e.target.value
})
}
/>

<br/><br/>

<select
onChange={(e)=>
setForm({
...form,
type:e.target.value
})
}

«»

<option value="solo">
Solo
</option><option value="squad">
Squad
</option><option value="guildwar">
Guild War
</option>
</select><br/><br/>

<textarea
placeholder="Description"
onChange={(e)=>
setForm({
...form,
description:e.target.value
})
}
/>

<br/><br/>

<input
placeholder="Prize Pool"
type="number"
onChange={(e)=>
setForm({
...form,
prizePool:e.target.value
})
}
/>

<br/><br/>

<input
placeholder="Entry Fee"
type="number"
onChange={(e)=>
setForm({
...form,
entryFee:e.target.value
})
}
/>

<br/><br/>

<input
placeholder="Total Slots"
type="number"
onChange={(e)=>
setForm({
...form,
totalSlots:e.target.value
})
}
/>

<br/><br/>

<input
type="datetime-local"
onChange={(e)=>
setForm({
...form,
startTime:e.target.value
})
}
/>

<br/><br/>

<button
onClick={
createTournament
}
>
Create Tournament
</button>

</div>
);
}

export default AdminTournament;
