import React from 'react';
import api from './resources';

const UserContext = React.createContext();

const UserProvider = ({children}) => {
    const [users, setUsers] = React.useState([]);
    const [status, setStatus] = React.useState("init");

    //funcion para enviar en nuestro "actions"
    //asi podemos agregar otras funciones y pasarlas a los componentes
    function fetchMore() {
        api.list().then(newUsers =>setUsers(oldUsers => oldUsers.concat(newUsers)))
    }

    const state = {users};
    const actions = {fetchMore};

    React.useEffect(() => {
        api.list().then(initialUsers => {
            setUsers(initialUsers);
            setStatus("resolved");
        })
        .catch(() => {
            setStatus("rejected");
        })
    }, []);

    if (status === "init") return <span>Cargando...</span>
    if (status === "reject") return <span>Error cargando los usuarios, intente mas tarde...</span>


    return <UserContext.Provider value={{state, actions}}>{children}</UserContext.Provider>
};

export { UserContext as default, UserProvider as Provider};