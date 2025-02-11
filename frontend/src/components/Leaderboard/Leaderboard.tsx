import classes from "./Leaderboard.module.scss";
import Sheet from "../Sheet/Sheet";
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
  const [tenMinPressed, setTenMinPressed] = useState(false);
  const [fiveMinPressed, setFiveMinPressed] = useState(true);

  useEffect(() => {
    getPageData(1);
  }, [leaderboardType]);

  const getPageData = async (pageNum: number) => {
    if (leaderboardPage != 0 && (pageNum <= 0 || pageNum > pageCount)) {
      return;
    }
    const resp = await fetch(
      `/api/leaderboard/data?pagenum=${pageNum}&gamemode=${leaderboardType}&increments=6`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (resp.status === 200) {
      const data = (await resp.json()) as fetchedData;
      setUsers(data.leaderboardData);
      if (data.pageCount != pageCount) {
        setPageCount(data.pageCount);
      }
      setLeaderboardPage(pageNum);
    } else if (resp.status === 204) {
      setUsers([]);
      setLeaderboardPage(1);
      setPageCount(1);
    }
  };

  return (
    <div className={classes.container}>
      <Sheet leaderboard>
        <h1 className={classes.title}>
          Leaderboard
          <div className={classes.firstOption}>
            <button
              className={classNames(classes.button, {
                [classes.pressed]: fiveMinPressed,
              })}
              onClick={async () => {
                if (leaderboardType === Gamemode.TIMED_5MIN) return;
                setLeaderboardType(Gamemode.TIMED_5MIN);
                setTenMinPressed(false);
                setFiveMinPressed(true);
              }}
            >
              5min
            </button>
          </div>
          <div className={classes.secondOption}>
            <button
              className={classNames(classes.button, {
                [classes.pressed]: tenMinPressed,
              })}
              onClick={async () => {
                if (leaderboardType === Gamemode.TIMED_10MIN) return;
                setLeaderboardType(Gamemode.TIMED_10MIN);
                setFiveMinPressed(false);
                setTenMinPressed(true);
              }}
            >
              10min
            </button>
          </div>
        </h1>
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
