import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import {Header} from "./Header";
import {Card} from "./Card";
import {List} from "./List";
import {Form} from "./Form";
import {useState} from "react";

function App() {
    const [ isFirstRender, setIsFirstRender ] = useState(true);
    const [ managerListState, setManagerListState ] = useState([]);
    const [ clientsListState, setClientsListState ] = useState([]);


    if (isFirstRender) {
        fetch('http://localhost:8081/clients', {
            method: 'GET'
        }).then((res) => {
            res.json().then((json) => {
                setClientsListState(json);
            });
        });
        fetch('http://localhost:8081/managers', {
            method: 'GET'
        }).then((res) => {
            res.json().then((json) => {
                setManagerListState(json);
            });
        });
        setIsFirstRender(false);
    }

    const setManagersList = (managersList, type) => {
        console.log(managersList);
        if (type === 'delete') {
            fetch('http://localhost:8081/delete/manager', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(managersList).length,
                },
                body: JSON.stringify(managersList)
            });
        } else if (type === 'add') {
            fetch('http://localhost:8081/add/manager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(managersList).length,
                },
                body: JSON.stringify(managersList)
            });
        }
        setManagerListState(managersList);
    };

    const setClientsList = (clientsList, type) => {
        if (type === 'delete') {
            fetch('http://localhost:8081/delete/client', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(clientsList).length,
                },
                body: JSON.stringify(clientsList)
            });
        } else if (type === 'add') {
            fetch('http://localhost:8081/add/client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(clientsList).length,
                },
                body: JSON.stringify(clientsList)
            });
        } else {
            fetch('http://localhost:8081/change/client', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(clientsList).length,
                },
                body: JSON.stringify(clientsList)
            });
        }
        setClientsListState(clientsList);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Header>Личный кабинет руководителя банковского отдела</Header>
                <div className="Content">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Card title="Список менеджеров">
                                    <List
                                        type={'manager'}
                                        arrayList={managerListState}
                                        setArrayList={setManagersList}
                                        pathToAdd={"/add/manager"}
                                    />
                                </Card>
                                <Card title="Список клиентов">
                                    <List
                                        linkedArray={managerListState}
                                        arrayList={clientsListState}
                                        setArrayList={setClientsList}
                                        pathToAdd={"/add/client"}
                                    />
                                </Card>
                            </>
                        }/>
                        <Route path="/add/manager" element={
                            <Card title="Добавление менеджера">
                                <Form
                                    list={managerListState}
                                    setList={setManagersList}
                                />
                            </Card>
                        }/>
                        <Route path="/add/client" element={
                            <Card title="Добавление клиента">
                                <Form
                                    type={'clients'}
                                    list={clientsListState}
                                    setList={setClientsList}
                                    options={managerListState}
                                />
                            </Card>
                        }/>
                        <Route path="/change/client" element={
                            <Card title="Изменение данных клиента">
                                <Form
                                    type={'clients'}
                                    action={'change'}
                                    list={clientsListState}
                                    setList={setClientsList}
                                    options={managerListState}
                                />
                            </Card>
                        }/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
