// Creates the variable to hold the db connection
let db;
//  establishes a connection to IndexedDB databse called pizza_hunt and sets the version to 1
// indexedDB.open() opens the cnnection to the database. Makes the db "pizza_hunt" and sets the default at 1
const request = indexedDB.open('pizza_hunt', 1)

// This will trigger if the db version changes (nonexistant to v1, v2, etc.)
request.onupgradeneeded = function (event) {
    // saves a reference too the db
    const db = event.target.result;
    // creates the table (object store) called new_pizza and sets auto incrememnt value for the id
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// upon a successful call
request.onsuccess = function (event) {
    // when the db is succesfully created or a connection is established, saves a reference as a global variable
    db = event.target.result;

    // checks if the app is online and rins uploadPizza() to send data to the api
    if (navigator.onLine) {
        uploadPizza();
    }
};

request.onerror = function(event) {
    // error logs here
    console.log(event.target.errorCode)
};

// This will trigger if a new pizza is created offline
function saveRecord(record) {
    // opens a new transaction with read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //  access the object store for a new pizza
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // add record to your store with the add method
    pizzaObjectStore.add(record);
};

function uploadPizza() {
    // open the transaction
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access the object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // Get all records and sets as a variable
    const getAll = pizzaObjectStore.getAll();

    // upon successful get getAll request
    getAll.onsuccess = function () {
        // if data is stored it will send to the api server
        if (getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'content-type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    // Opens one more transaction
                    const transaction = db.transaction(['new_pizza'], 'readwrite');
                    // access the new store
                    const pizzaObjectStore = transaction.objectStore('new_pizza');
                    // clear all the items in the store
                    pizzaObjectStore.clear();

                    alert('All the stored Pizzas have been submitted!')
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
}

// listen for the network change
window.addEventListener('online', uploadPizza);