export function EventDatabaseRequest () {
    const eventDatabaseRequest = window.indexedDB.open('Attendance-Tracker-events',1)
    eventDatabaseRequest.onerror = (error) => {
        console.error('ERROR on EventDatabase.jsx: ', error)
    };

    eventDatabaseRequest.onsuccess = (event) => {
        console.log('Successful Opening of users database', event)
    };

    eventDatabaseRequest.onupgradeneeded = (event) => {
        const eventDatabase = event.target.result;
        eventDatabase.createObjectStore('events', {keypath:'eventName'})
    };

    
    return eventDatabaseRequest
}