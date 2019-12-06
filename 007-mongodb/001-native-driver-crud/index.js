const {MongoClient, ObjectId} = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'demo_native';
const collectionName = 'demo_collection';

// Use connect method to connect to the server
(async function () {
  const connection = await MongoClient.connect(url, {useUnifiedTopology: true});
  const db = connection.db(dbName);
  const collection = db.collection(collectionName);
  // await db.dropDatabase();

  /**
   * @type {InsertOneWriteOpResult}
   * @link http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
   */
  const insertResult = await collection.insertOne({id: 'as;lkfdj', foo: '1'});
  console.log('Insert result = ');
  console.dir(Object.keys(insertResult), {colors: true});
  const insertedId = insertResult.insertedId;
  console.log('Insert id = %s', insertedId);
  console.log(typeof insertedId);

  // const document = await collection.findOne({_id: ObjectId('5deaa5943098de1bdb904cd9')});
  const document = await collection.findOne({_id: insertedId});
  console.log('Document = ');
  console.dir(document, {colors: true});

  /**
   * @type {UpdateWriteOpResult}
   * @link http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~updateWriteOpResult
   */
  const updateResult = await collection.updateOne({_id: insertedId}, {$set: {bar: 'foo'}});
  console.log('Update result = ');
  console.dir(Object.keys(updateResult), {colors: true});

  /**
   * @type {DeleteWriteOpResultObject}
   * @link http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~deleteWriteOpResult
   */
  const deleteResult = await collection.deleteOne({_id: insertedId});
  console.log('Delete result = ');
  console.dir(Object.keys(deleteResult), {colors: true});
  // await collection.deleteMany({});

  await connection.close();
})();
