import { Link } from "react-router-dom";

function TournamentCard({ tournament }) {

  return (
    <div>

      <img 
        src={tournament.banner || "https://via.placeholder.com/300"}
        alt={tournament.title}
      />

      <h2>
        {tournament.title}
      </h2>

      <p>
        Game: {tournament.game}
      </p>

      <p>
        Prize Pool: ₹{tournament.prizePool}
      </p>

      <p>
        Entry Fee: ₹{tournament.entryFee}
      </p>

      <p>
        Slots: {tournament.filledSlots}/{tournament.totalSlots}
      </p>

      <p>
        Status: {tournament.status}
      </p>


      <Link to={`/tournament/${tournament._id}`}>
        View Tournament
      </Link>


    </div>
  );
}


export default TournamentCard;
