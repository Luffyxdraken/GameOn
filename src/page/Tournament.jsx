import {useParams} from "react-router-dom";


function Tournament(){

const {id}=useParams();


return (

<div>

<h1>
Tournament Details
</h1>

<p>
Tournament ID:
{id}
</p>


</div>

)

}


export default Tournament;
