function TournamentCard({ tournament }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}
    >
      <h2>{tournament.title}</h2>

      <p>Prize Pool: ₹{tournament.prizePool}</p>

      <p>Status: {tournament.status}</p>

      <p>Slots: {tournament.filledSlots}/{tournament.totalSlots}</p>
    </div>
  );
}

export default TournamentCard;
