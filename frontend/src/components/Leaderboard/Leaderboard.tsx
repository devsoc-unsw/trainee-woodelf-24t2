import classes from "./Leaderboard.module.scss";
import Sheet from "../Forms/Sheet/Sheet";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ring2 } from "ldrs";
import { useEffect, useState } from "react";
import classNames from "classnames";
ring2.register();

interface User {
  rank: number;
  username: string;
  points: number;
}

function Leaderboard() {
  const [leaderboardPage, setLeaderboardPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [leaderboardType, setLeaderboardType] = useState("5min");

  useEffect(() => {
    const users = [
      { rank: 1, username: "Chris", points: 1000 },
      { rank: 2, username: "Alyssa", points: 950 },
      { rank: 3, username: "Ben", points: 900 },
    ];

    users.sort((a, b) => b.points - a.points);
    setTimeout(() => {
      setUsers(users);
      setIsProcessing(false);
    }, 1000);
  }, []);

  const getPageData = async (pageNum: Number) => {
    const leaderboardBody = {
      leaderboardType: leaderboardType,
      pageNum: pageNum,
    };

    setIsProcessing(true);
    try {
      const resp = await fetch("http://localhost:3000/getPageData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaderboardBody),
      });

      if (resp.ok) {
        const fetchedLeaderboardData = (await resp.json()) as User[];
        setUsers(fetchedLeaderboardData);
      } else {
      }
    } catch (err) {
      console.log("error ", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={classes.container}>
      <Sheet sheetLeaderboard={true}>
        <h1 className={classes.title}>Leaderboard</h1>
        {isProcessing ? (
          <l-ring-2
            size="80"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="hsl(52, 100%, 50%)"
            // @ts-ignore
            style={{ margin: "auto 0" }}
          />
        ) : (
          <table>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td
                    className={classNames(classes.rank, {
                      [classes.first]: user.rank === 1,
                      [classes.second]: user.rank === 2,
                      [classes.third]: user.rank === 3,
                    })}
                  >
                    {user.rank}
                  </td>
                  <td className={classes.username}>{user.username}</td>
                  <td className={classes.points}>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className={classes.next}>
          <div className={classes.buttonsContainer}>
            <button
              className={classes.icons}
              onClick={() => getPageData(leaderboardPage - 1)}
            >
              <ChevronLeft size={30} />
            </button>
            <button
              className={classes.icons}
              onClick={() => getPageData(leaderboardPage + 1)}
            >
              <ChevronRight size={30} />
            </button>
          </div>
          <p className={classes.page}>Page {leaderboardPage} of x</p>
        </div>
      </Sheet>
    </div>
  );
}

export default Leaderboard;
