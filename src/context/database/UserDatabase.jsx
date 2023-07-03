export default function UserDatabaseRequest () {
    const userDatabaseRequest = window.indexedDB.open("Attendance-Tracker-users", 1);

    // const [userDatabase, setUserDatabase] = useState(null);

    userDatabaseRequest.onsuccess = (event) => {
        console.log('Successful Opening of users database', event)
    };

    userDatabaseRequest.onerror = (error) => {
        console.error('ERROR on UserDatabase.jsx: ',error);
    };

    
    userDatabaseRequest.onupgradeneeded = (event) => {
        const userDatabase = event.target.result;
        userDatabase.createObjectStore("users", { keyPath: "email" })
    };


    return userDatabaseRequest;
}

