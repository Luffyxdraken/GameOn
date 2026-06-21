import {
Link
} from "react-router-dom";


function TournamentCard({tournament}){


return (

<div>


<h2>
{tournament.title}
</h2>


<p>
Game:
{tournament.game}
</p>


<p>
Prize:
₹{tournament.prizePool}
</p>


<p>
Slots:
{tournament.filledSlots}/
{tournament.totalSlots}
</p>


<Link
to={`/tournament/${tournament._id}`}
>

View Tournament

</Link>


</div>

)

}


export default TournamentCard;
