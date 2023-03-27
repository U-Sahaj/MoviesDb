import { describe, it, test } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import * as tsnode from 'ts-node'

tsnode.register({ transpileOnly: true })


const runTest = async () => {
  const mongod = await MongoMemoryServer.create();
  await mongod.start();
  const uri = await mongod.getUri()
  // Do your tests here
  console.log('MongoDB URI:', uri)
  await mongod.stop()
}

describe.skip('Mongo Memory Server Test', () => {
  it('Test MongoDB', async () => {
    await runTest()
  })
})
