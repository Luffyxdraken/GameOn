import {useEffect,useState} from "react";
import API from "../api/axios";
import TournamentCard from "../components/TournamentCard";


function Home(){

const [tournaments,setTournaments]=useState([]);


useEffect(()=>{

API.get("/tournaments")
.then(res=>{

setTournaments(
res.data.tournaments
);

});

},[]);



return (

<div>

<h1>
PR eSports
</h1>


<h2>
Upcoming Tournaments
</h2>


{
tournaments?.map(t=>(

<TournamentCard
key={t._id}
tournament={t}
/>

))
}


</div>

)

}


export default Home;
