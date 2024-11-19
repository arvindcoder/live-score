import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://apiv2.api-cricket.com/?method=get_livescore&APIkey=c0dc99bbac14ed2463bd69442fe329e04f4e69ae377e380d49e5f00acfc9f1e3"
        );
        const data = await res.json();
        console.log(data.result);

        if (data.success === 1) {
          setDisplay(data.result);
        } else {
          setError("No live scores found.");
        }
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Loading or Error States
  if (loading) {
    return <div className="loading">Loading live scores...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="App">
      <h1>Live Cricket Scores</h1>

      {/* Displaying live matches */}
      {display.length === 0 ? (
        <div>No live matches at the moment.</div>
      ) : (
        display.map((match) => (
          <div key={match.event_key} className="match">
            <div className="team-info">
              <img
                src={match.event_home_team_logo}
                alt={match.event_home_team}
                className="team-logo"
              />
              <h3>
                {match.event_home_team} vs {match.event_away_team}
              </h3>
              <img
                src={match.event_away_team_logo}
                alt={match.event_away_team}
                className="team-logo"
              />
            </div>
            <div className="match-status">
              <h4>Status: {match.event_status}</h4>
              <p>{match.event_status_info}</p>
            </div>
            <div className="details">
              <p>
                League: {match.league_name} | Round: {match.league_round} |
                Season: {match.league_season}
              </p>
              <p>Toss: {match.event_toss}</p>
              <p>Stadium: {match.event_stadium}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
