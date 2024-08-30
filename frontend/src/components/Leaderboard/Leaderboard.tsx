import classes from "./Leaderboard.module.scss";
import Sheet from "../Forms/Sheet/Sheet";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface User {
  rank: number;
  username: string;
  score: number;
}

interface fetchedData {
  leaderboardData: User[];
  pageCount: number;
}

enum Gamemode {
  EXPLORATION = 0,
  TIMED_5MIN = 1,
  TIMED_10MIN = 2,
}

function Leaderboard() {
  const [leaderboardPage, setLeaderboardPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [leaderboardType, setLeaderboardType] = useState(Gamemode.TIMED_5MIN);

  useEffect(() => {
    getPageData(1);
  }, []);

  const getPageData = async (pageNum: number) => {
    if (leaderboardPage != 0 && (pageNum <= 0 || pageNum > pageCount)) {
      return;
    }
    try {
      const resp = await fetch(
        `http://localhost:3000/leaderboard/data?pagenum=${pageNum}&gamemode=${leaderboardType}&increments=6`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (resp.ok) {
        const data = (await resp.json()) as fetchedData;
        setUsers(data.leaderboardData);
        if (data.pageCount != pageCount) {
          setPageCount(data.pageCount);
        }
        setLeaderboardPage(pageNum);
      } else {
        console.log("No users found!");
      }
    } catch (err) {
      console.log("error ", err);
    }
  };

  return (
    <div className={classes.container}>
      <Sheet sheetLeaderboard={true}>
        <h1 className={classes.title}>Leaderboard</h1>
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
                <td className={classes.points}>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <p className={classes.page}>
            Page {leaderboardPage} of {pageCount}
          </p>
        </div>
      </Sheet>
    </div>
  );
}

export default Leaderboard;
