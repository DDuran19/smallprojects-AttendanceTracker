import UserDatabaseRequest from "./UserDatabase";

const logError = (error) => {
    console.error('ERROR on UserDatabaseOperations.jsx: ', error);
};
export const addUser = (newUserDetails) => {
    const request = UserDatabaseRequest();

    request.onerror = logError;

    request.onsuccess = (event) => {
        const userDatabase = event.target.result;
        const userObjectStore = userDatabase.transaction('users', 'readwrite').objectStore('users');
        userObjectStore.add(newUserDetails);
    };
}

// UserDatabaseOperations.jsx

export const readUser = (email) => {
    const request = UserDatabaseRequest();
  
    return new Promise((resolve, reject) => {
      request.onerror = (error) => {
        logError(error);
        reject(error);
      };
  
      request.onsuccess = (event) => {
        const userDatabase = event.target.result;
        const userObjectStore = userDatabase.transaction("users", "readonly").objectStore("users");
  
        const getRequest = userObjectStore.get(email);
        getRequest.onsuccess = (event) => {
          const userData = event.target.result;
          resolve(userData);
        };
        getRequest.onerror = (error) => {
          logError(error);
          reject(error);
        };
      };
    });
  };
  