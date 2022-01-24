import './index.css';
import {Button} from "../Button";
import {Link} from "react-router-dom";

export const Header = (props) => {
    const headerText = props.children;

    return (
        <div className="Header">
            {headerText}
            <Link to="/" className="Header-Home">
                <Button className="Header-HomeButton" type="default">Домой</Button>
            </Link>
        </div>
    );
}
