import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const DatabaseContext = createContext({});

export function useDatabase() {
    return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
    const userDatabaseRequest = window.indexedDB.open("Attendance-Tracker-users", 1);
    const eventsDatabaseRequest = window.indexedDB.open("Attendance-Tracker-events", 1);
    let userDatabase;
    let userDatabaseError;
    const [loggedInUser, setLoggedInUser] = useState(null);

    const readUser = (email) => {
        return new Promise((resolve, reject) => {
            const transaction = userDatabase.transaction('users', 'readonly');
            const objectStore = transaction.objectStore('users');
            const getRequest = objectStore.get(email);

            getRequest.onsuccess = (event) => {
                const userData = event.target.result;
                resolve(userData);
            }
            getRequest.onerror = (event) => {
                reject(event.target.error);
            };
            transaction.oncomplete = (event) => {
                console.log("Transaction complete."); 
            };
        });
    };
    const addUser = (userData) => {
        const transaction = userDatabase.transaction("users", "readwrite");
        const objectStore = transaction.objectStore("users");

        const addRequest = objectStore.add(userData);

        addRequest.onsuccess = (event) => {
            console.log("Data added successfully!");
        };

        addRequest.onerror = (event) => {
            console.error("Error adding data:", event.target.error);
        };

        transaction.oncomplete = (event) => {
            console.log("Transaction complete.");
        };
    };

    userDatabaseRequest.onupgradeneeded = (event) => {
        userDatabase = event.target.result;

        if (!userDatabase.objectStoreNames.contains("Attendance-Tracker-users")) {
            const objectStore = userDatabase.createObjectStore("users", { keyPath: "email" });
            console.log('objectStore:', objectStore);
            const defaultData = [{
                email: "admin@admin.admin",
                name: "admin",
                password: "admin",
                secretQuestion: "Who is the admin?",
                secretAnswer: "admin"
            }];

            objectStore.createIndex('email', 'email', { unique: true });

            objectStore.transaction.oncomplete = (event) => {
                const userObjectStore = userDatabase.transaction('users', 'readwrite').objectStore('users');
                defaultData.forEach((user) => {
                    userObjectStore.add(user);
                });
            };
        }
    };

    useEffect(() => {
        userDatabaseRequest.onsuccess = (event) => {
            userDatabase = event.target.result;
        };

        userDatabaseRequest.onerror = (error) => {
            userDatabaseError = `${error}`;
        };

        // eventsDatabaseRequest.onsuccess = (event) => {
        //     eventsDatabase = event.target.result;
        // };

        // eventsDatabaseRequest.onerror = (error) => {
        //     eventsDatabaseError = `${error}`;
        // };
    }, []);
    return (
        <DatabaseContext.Provider value={{
            loggedInUser, setLoggedInUser,
            userDatabase,
            //eventsDatabase,
            userDatabaseError,
            //eventsDatabaseError,
            readUser,
            addUser
        }}>
            {children}
        </DatabaseContext.Provider>
    );
}

DatabaseProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
