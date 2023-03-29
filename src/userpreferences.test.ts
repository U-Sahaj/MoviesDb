import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';

describe.skip('MongoDB CRUD operations', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017');
    db = await connection.db('TestDb');
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const collection = await db.collection('userpreferences');
    //await collection.deleteMany({});
  });  

  test('Inserts and retrieves data from MongoDB', async () => {
    const collection = await db.collection('userpreferences');
      
    // Get the absolute path to the file
    const filePath = resolve(__dirname, './userpreferences.json');
    const jsonData = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    // Insert the data into MongoDB
    await collection.insertMany(data);

    // Retrieve the data from MongoDB
    const result = await collection.find().toArray();

    // Verify that the data was inserted correctly
    expect(result).toEqual(data);
    console.log(`userpreferences: ${result.length} records inserted`)
  });
});
