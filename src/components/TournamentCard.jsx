function TournamentCard({ tournament }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        color: "white"
      }}
    >
      <h2>{tournament.title}</h2>

      <p>Prize Pool: ₹{tournament.prizePool}</p>

      <p>Entry Fee: ₹{tournament.entryFee}</p>

      <p>Slots: {tournament.filledSlots}/{tournament.totalSlots}</p>

      <p>📌 Status: {tournament.status}</p>
    </div>
  );
}

export default TournamentCard;
