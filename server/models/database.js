/**
 * @Author: Cogic
 * @Date: 2021-12-21 14:19:18
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-24 19:20:53
 * @Description: 
 */
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'
const dbName = 'castlechart'

/**
 * @description: callback(db: any, callback: Function)
 * @param {function} callback
 * @author: Cogic
 */
function connectDB(callback) {
  const client = new MongoClient(url, { useNewUrlParser: true })
  client.connect((err) => {
    assert.equal(null, err)
    // console.log('Connected')

    const db = client.db(dbName)

    callback(db, () => {
      client.close()
    })
  })
}

/**
 * @description: callback(result: any)
 * @param {string} docName
 * @param {*} insertData
 * @param {function} callback
 * @author: Cogic
 */
function insertDoc(docName, insertData, callback) {
  connectDB((db, turnback) => {
    const collection = db.collection(docName)
    collection.insertOne(insertData, function (err, result) {
      assert.equal(err, null)
      // console.log('Inserted')
      turnback()   
      callback(result)
    })
  })
}

/**
 * @description: callback(docs: any)
 * @param {string} docName
 * @param {*} whereData
 * @param {function} callback
 * @author: Cogic
 */
function findDoc(docName, whereData, callback) {
  connectDB((db, turnback) => {
    const collection = db.collection(docName)
    collection.find(whereData).toArray(function (err, docs) {
      assert.equal(err, null)
      // console.log('Found')
      turnback()
      callback(docs)
    })
  })
}

/**
 * @description: callback(result: any)
 * @param {string} docName
 * @param {*} whereData
 * @param {*} setData
 * @param {function} callback
 * @author: Cogic
 */
function updateDoc(docName, whereData, setData, callback) {
  connectDB((db, turnback) => {
    const collection = db.collection(docName)
    collection.updateOne(whereData, {$set:setData}, function (err, result) {
      assert.equal(err, null)
      // console.log('Updated')
      turnback()
      callback(result)
    })
  })
}

/**
 * @description: callback(result: any)
 * @param {string} docName
 * @param {*} whereData
 * @param {function} callback
 * @author: Cogic
 */
function deleteDoc(docName, whereData, callback) {
  connectDB((db, turnback) => {
    const collection = db.collection(docName)
    collection.deleteOne(whereData, function (err, result) {
      assert.equal(err, null)
      // console.log('Removed')
      turnback()
      callback(result)
    })
  })
}

module.exports = { insertDoc, findDoc, updateDoc, deleteDoc }
