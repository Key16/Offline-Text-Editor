import { openDB } from "idb";

const initdb = async () =>
  // We are creating a new database named 'jate' which will be using version 1 of the database.

  openDB("jate", 1, {
    // Add our database schema if it has not already been initialized.

    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.

      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// logic to a method that accepts some content and adds it to the database

export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, jate: content });
  const result = await request;
  console.log("🚀 - text edits saved to the database", result);
};

// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log("GET from the jate database");

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  const result = await request;

  // Get confirmation of the request.
  console.log("this result is", result);

  return result;
};

initdb();
