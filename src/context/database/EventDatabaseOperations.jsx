import { EventDatabaseRequest } from "./EventDatabase";

const logError = (error) => {
    console.error('ERROR on EventDatabaseOperations.jsx: ', error);
};

export function addEvent(eventDetails){
    const request = EventDatabaseRequest();
    
    return new Promise((resolve, reject) => {
        request.onerror = (error) => {
            logError(error);
            reject(error);
        };
    
        request.onsuccess = (event) => {
            const eventDatabase = event.target.result;
            const transaction = eventDatabase.transaction('events','readonly');
            const eventObjectStore = transaction.objectStore('events');
            const addRequest = eventObjectStore.add(eventDetails);

            addRequest.onerror = (error) => {
                logError(error);
                reject(error);
            }

            addRequest.onsuccess = () => {
                resolve(true);
            }
            
        }
    })
    
}

export function readEvents(eventDetails){
    const request = EventDatabaseRequest();

    return new Promise((resolve, reject) => {
        request.onerror = (error) =>{
            logError(error);
            reject(error);
        };

        request.onsuccess = (event) => {
            const eventDatabase = event.target.result;
            const transaction = eventDatabase.transaction('events', 'readonly');
            const eventObjectStore = transaction.objectStore('events');
    
            const getRequest = eventObjectStore.getAll(eventDetails)
            
            getRequest.onerror = (error) =>{
                logError(error);
                reject(error);
            }

            getRequest.onsuccess = (event) => {
                const events = event.target.result;
                resolve(events)
            }
        }
    })
    
}