import classes from "./Credits.module.scss";
import { X } from "lucide-react";
import Sheet from "../Sheet/Sheet";
import { shuffle } from "txt-shuffle";
import { useEffect, useState } from "react";

function Credits({ onClick }: { onClick: () => void }) {
  const [alyssaText, setAlyssaText] = useState("");
  const [benText, setBenText] = useState("");
  const [chrisText, setChrisText] = useState("");
  const [lachlanText, setLachlanText] = useState("");
  const [osvaldoText, setOsvaldoText] = useState("");
  
  const names: string[] = [
    "Alyssa Cheong",
    "Ben Goldwin",
    "Chris Wong",
    "Lachlan Shoesmith",
    "Osvaldo Prajitno",
  ];

  const textSetters = [
    setAlyssaText,
    setBenText,
    setChrisText,
    setLachlanText,
    setOsvaldoText,
  ];
  useEffect(() => {
    const delay = 1000; // Base delay time in milliseconds
    names.forEach((name: string, index: number) => {
      setTimeout(() => {
        shuffle({
          text: name,
          fps: 30,
          animation: "show",
          direction: "right",
          onUpdate: (output: string) => textSetters[index](output),
        });
      }, delay * index); // Increment delay for each name
    });
  }, []);

  return (
    <Sheet sheetCredits={true}>
      <button className={classes.close} onClick={onClick}>
        <X />
      </button>
      <h1 className="title">Credits</h1>
      <ul className={classes.creditstext}>
        <li>
          <a href="https://www.github.com/alyssacheong">{alyssaText}</a>
        </li>
        <li>
          <a href="https://www.github.com/bengodw">{benText}</a>
        </li>
        <li>
          <a href="https://www.github.com/xleonx0x">{chrisText}</a>
        </li>
        <li>
          <a href="https://www.github.com/lachlanshoesmith">{lachlanText}</a>
        </li>
        <li>
          <a href="https://www.github.com/OsvaldoPrajitno">{osvaldoText}</a>
        </li>
      </ul>
    </Sheet>
  );
}

export default Credits;
