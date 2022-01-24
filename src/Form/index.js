import './index.css';
import {Input} from "../Input";
import {useState} from "react";
import {Select} from "../Select";
import {Button} from "../Button";
import {StatusBlock} from "../StatusBlock";

export const Form = (props) => {
    const {
        list,
        setList,
        options,
        type,
        action
    } = props;
    let defaultName = '';
    let defaultSelectedManager = '';
    let defaultReason = '';
    let id = -1;
    if (action === 'change') {
        let searchParams = new URLSearchParams(window.location.search);
        id = parseInt(searchParams.get('id'));
        defaultName = list[id].firstName;
        defaultSelectedManager = list[id].managerId;
        defaultReason = list[id].description;
    }

    const [name, setName] = useState(defaultName);
    const [selectedManager, setSelectedManager] = useState(defaultSelectedManager);
    const [reason, setReason] = useState(defaultReason);
    const [formStatus, setFormStatus] = useState('');


    const onChangeSelect = (event) => {
        setSelectedManager(event.target.value);
    };

    const onChangeReason = (event) => {
        setReason(event.target.value);
    };

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        if (type === "clients") {
            if (!name || !selectedManager || !reason) {
                setFormStatus('alert');
                return;
            }
        } else {
            if (!name) {
                setFormStatus('alert');
                return;
            }
        }
        const array = list.map((value) => {
            return value;
        });

        if (action === 'change') {
            array.map((value, index) => {
                if (id !== -1 && index === id) {
                    value.firstName = name;
                    value.managerId = Number(selectedManager);
                    value.description = reason
                }
                return value;
            })
        } else {
            array.push({
                managerId: Number(selectedManager),
                firstName: name,
                description: reason,
            });
        }

        if (action !== 'change') {
            setList(array, 'add');
        } else {
            setList(array);
        }

        setFormStatus('success');
        if (action !== 'change') {
            setName('');
            setSelectedManager('');
            setReason('');
        }
    };

    return (
        <form onSubmit={onSubmitForm}>
            <StatusBlock type={formStatus} />
            <Input
                title={"Имя"}
                value={name}
                onChange={onChangeName}
            />
            { type === 'clients' && (
                <Input
                    value={reason}
                    title={"Причина звонка"}
                    onChange={onChangeReason}
                />
            )}
            { type === 'clients' && (
                <Select
                    title="Менеджер для обзвона"
                    value={selectedManager}
                    options={options.map((value) => {
                        return value.firstName;
                    })}
                    placeholder={"Выбери имя"}
                    onChange={onChangeSelect}
                />
            )}
            <Button className={'Form-Submit'} submit={true} type="action">{(action === 'change') ? 'Изменить' : 'Добавить'}</Button>
        </form>
    );
};
