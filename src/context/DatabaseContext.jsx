import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { readUser, addUser } from "./database/UserDatabaseOperations";
import { readEvents, addEvent } from "./database/EventDatabaseOperations";
const DatabaseContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export function useDatabase() {
    return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
    const [loggedInUser, setLoggedInUser] = useState(null);   
    
    useEffect(()=>{
        const defaultData = {
            email: "admin@admin.admin",
            name: "admin",
            password: "admin",
            secretQuestion: "Who is the admin?",
            secretAnswer: "admin"}
        addUser(defaultData)
    },[])


    return (
        <DatabaseContext.Provider value={{
            loggedInUser, setLoggedInUser,
            readEvents, addEvent,
            readUser, addUser
        }}>
            {children}
        </DatabaseContext.Provider>
    );
}

DatabaseProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
