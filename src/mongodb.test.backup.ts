import { MongoClient } from 'mongodb'

const uri = 'mongodb://localhost:27017/'

const runTest = async () => {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('mydb')
  // Do your tests here
  console.log('Connected to MongoDB')
  await client.close()
}

runTest().catch(console.error)
