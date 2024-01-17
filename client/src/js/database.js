import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    // Create a connection to the database database and version we want to use.
    // const jateDB = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = db.transaction(DB_STORE_NAME, 'readwrite');

    // Open up the desired object store.
    const store = tx.objectStore(DB_STORE_NAME);
    // Put requires an object as an argument.
    await store.put({value: content, id: 1});
    tx.oncomplete;
    // Get confirmation of the request.
    console.log('Data added to the database', content);
  } catch (error) {
    console.error('Error adding data to the database', error);
    throw error;
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    // Create a connection to the database database and version we want to use.
    // const jateDB = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = db.transaction(DB_STORE_NAME, 'readonly');

    // Open up the desired object store.
    const store = tx.objectStore(DB_STORE_NAME);
    const result = await store.get(1);
    console.log('result', result);
    // Get confirmation of the request.
    console.log('result.value', result.value);
    return result.value;
  } catch (error) {
    console.error('Error getting data from the database', error);
    throw error;
  }
};

initdb();
