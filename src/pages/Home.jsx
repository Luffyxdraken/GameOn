import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>PR eSports</h1>

      <div>
        <h2>Free Fire MAX Scrim</h2>
        <p>Prize Pool: ₹1000</p>
        <p>Status: Upcoming</p>

        <Link to="/tournament/demo">
          Join Tournament
        </Link>
      </div>
    </div>
  );
}

export default Home;
