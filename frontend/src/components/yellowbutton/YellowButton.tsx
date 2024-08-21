import classes from './YellowButton.module.css';

interface YellowButtonProps {
    text: string;
}

function YellowButton({ text }: YellowButtonProps) {
    return (
        <div>
          <button>
            <p className={classes.text} >{text}</p>
            </button>
        </div>
      );
    }
export default YellowButton;