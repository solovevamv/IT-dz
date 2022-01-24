import './index.css';
import {ListItem} from "../ListItem";
import {Button} from "../Button";
import {Link} from "react-router-dom";

export const List = (props) => {
    const { arrayList, setArrayList, pathToAdd, type, linkedArray } = props;

    return (
        <div>
            { arrayList.map((value, index) => {
                let description = value.description;
                if (linkedArray && linkedArray[value.managerId]) {
                    description = `${linkedArray[value.managerId].firstName} · ${value.description}`;
                }
                return (
                    <ListItem
                        type={type}
                        key={index}
                        index={index}
                        list={arrayList}
                        setState={setArrayList}
                        title={`${value.firstName}`}
                        description={description}
                    />);
            })}
            <Link to={pathToAdd} className="ArrayList-Add-Link">
                <Button className="ArrayList-Add" type="action">Добавить</Button>
            </Link>
        </div>
    );
}
