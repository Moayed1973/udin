import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await axios.get("/scores/leaderboard");
        setScores(res.data);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  if (loading) return <div className="loading">Loading leaderboard...</div>;

  return (
    <div className="leaderboard-container">
      <h2>Top Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Moves</th>
            <th>Level</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score._id}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.moves}</td>
              <td>{score.level?.name || "Default"}</td>
              <td>{new Date(score.completedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
