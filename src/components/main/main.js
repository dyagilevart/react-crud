import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Main() {
    const [empl, setEmpl] = useState([]);
    let history = useHistory();

    function updateUsers() {
        fetch("http://192.168.6.95:8000/emp/")
            .then(res => res.json())
            .then(
                (result) => {
                    setEmpl(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    function deleteItem(id, event) {
        const requestOptions = {
            method: 'DELETE'
        };

        fetch("http://192.168.6.95:8000/emp/delete/" + id, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            updateUsers();
        });
    }

    function editItem(item) {
        history.push(
            {
                pathname: "/edit/" + item._id,
                state: { item: item }
            }
        );
    }

    useEffect(() => {
        updateUsers();
    }, [])

    const emplTempl = empl.length === 0 ?
        (<div>Здесь пока пусто</div>) :
        empl.map((item, index) => (
            <div key={item._id}>
                <span>
                    {item.empName}
                </span>
                <span>
                    {item.empEmail}
                </span>
                <span>
                    {item.empMobile}
                </span>
                <span>
                    <button onClick={editItem.bind(this, item)}>Edit</button>
                </span>
                <span>
                    <button onClick={deleteItem.bind(this, item._id)}>Delete</button>
                </span>
            </div>
        ));
    return <div>
        {
            emplTempl
        }
    </div>;
}

export default Main;