import classes from "./Leaderboard.module.scss";
import Sheet from "../Forms/Sheet/Sheet";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

function Leaderboard() {
  const [leaderboardPage, setLeaderboardPage] = useState(1);

  const users = [
    { username: "Chris", points: 1000 },
    { username: "Alex", points: 950 },
    { username: "Jordan", points: 900 },
    { username: "Chris", points: 1000 },
    { username: "Alex", points: 950 },
    { username: "Jordan", points: 900 },
  ];

  return (
    <div className={classes.container}>
      <Sheet sheetLeaderboard={true}>
        <h1 className={classes.title}>Leaderboard</h1>
        <table>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className={classes.rank}>{index + 1}</td>{" "}
                <td className={classes.username}>{user.username}</td>
                <td className={classes.points}>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={classes.next}>
          <div className={classes.buttonsContainer}>
            <button className={classes.icons}>
              <ChevronLeft size={30} />
            </button>
            <button className={classes.icons}>
              <ChevronRight size={30} />
            </button>
          </div>
          <p className={classes.page}>Page {leaderboardPage}</p>
        </div>
      </Sheet>
    </div>
  );
}

export default Leaderboard;
