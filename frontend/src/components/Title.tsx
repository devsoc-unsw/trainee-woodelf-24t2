import classes from './Title.module.css';

type Level = "small" | "medium" | "large"

interface TitleProps {
    level: Level;
}

function Title({level} : TitleProps) {
    let size : number;
    switch(level) {
        case "small":
            size = 1;
            break;
        case "medium":
            size = 1.5;
            break;
        case "large":
            size = 2;
            break;
    }

    return(
        <h1 
            className={classes.titleStyle}
            style={{fontSize: size + "rem"}} 
        >
            <img 
                style={{width: size + "rem"}} 
                className={classes.iconStyle} 
                src="/yellowshirt.svg" 
                alt="yellowshirt" 
            />
            <div>
                <span className="yellow">yellow</span><span className="shirt">shirt</span>
            </div>
        </h1>
    )
}

export default Title;