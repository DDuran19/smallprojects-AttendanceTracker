const userDatabaseRequest = window.indexedDB.open("Attendance-Tracker-users", 1);
    const eventDatabaseRequest = window.indexedDB.open("Attendance-Tracker-events", 1);
    
    let userDatabaseError;
    let eventDatabaseError;
    useEffect(() => {
        userDatabaseRequest.onsuccess = (event) => {
            setUserDatabase(event.target.result);
        };

        userDatabaseRequest.onerror = (error) => {
            userDatabaseError = `${error}`;
        };

        eventDatabaseRequest.onsuccess = (event) => {
            setEventDatabase(event.target.result);
        };

        eventDatabaseRequest.onerror = (error) => {
            eventDatabaseError = `${error}`;
        };
    }, []);
    
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userDatabase, setUserDatabase] = useState(undefined);
    const [userDatabaseObjectStore, setUserDatabaseObjectStore] = useState(null)
    const [readUserTransaction, setReadUserTransaction] = useState(undefined)
    const [userObjectStore, setUserObjectStore] = useState(undefined)

    const [eventDatabase, setEventDatabase] = useState(undefined)
    userDatabaseRequest.onupgradeneeded = (event) => {
        setUserDatabase(event.target.result);

        if (!userDatabase.objectStoreNames.contains("Attendance-Tracker-users")) {
            setUserDatabaseObjectStore(userDatabase.createObjectStore("users", { keyPath: "email" }));
            const defaultData = [{
                email: "admin@admin.admin",
                name: "admin",
                password: "admin",
                secretQuestion: "Who is the admin?",
                secretAnswer: "admin"
            }];

            userDatabaseObjectStore.createIndex('email', 'email', { unique: true });

            userDatabaseObjectStore.transaction.oncomplete = (event) => {
                const userObjectStore = userDatabase.transaction('users', 'readwrite').objectStore('users');
                defaultData.forEach((user) => {
                    userObjectStore.add(user);
                });
            };
        } else {
            setReadUserTransaction(userDatabase);
            setUserObjectStore(readUserTransaction);
        }
    };

    const readUser = (email) => {

        return new Promise((resolve, reject) => {
            console.log('USER DATABASE: ',userDatabase)
            const getRequest = userObjectStore.get(email);
            getRequest.onsuccess = (event) => {
                const userData = event.target.result;
                resolve(userData);
            }
            getRequest.onerror = (event) => {
                reject(event.target.error);
            };
            readUserTransaction.oncomplete = (event) => {
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

    eventDatabaseRequest.onupgradeneeded = (event) => {
        setEventDatabase(event.target.result);
        if (!eventDatabase.objectStoreNames.contains("Attendance-Tracker-events")) {
            const objectStore = userDatabase.createObjectStore("events", { keyPath: "eventID" });
            objectStore.createIndex('eventID', 'eventID', { unique: true });
            objectStore.createIndex('users', 'usersEmail', { unique: false});
            }

        }
    
    const displayEvents = (userEmail) => {
        return new Promise ((resolve, reject) => {
            const transaction = eventDatabase.transaction('events', 'readonly');
            const objectStore = transaction.objectStore('events');
            const getRequest = objectStore.get(userEmail);
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
        })
    }