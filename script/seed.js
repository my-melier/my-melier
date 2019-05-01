const dataForge = require('data-forge')
require('data-forge-fs')
const Sequelize = require('sequelize')
const db = require('../server/db')
const Wine = require('../server/db/models/Wine')

let wineData = dataForge
    .readFileSync('script/winemag-data-130k-v2.csv')
    .parseCSV()
    .toArray()


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
    
  const wines = await Promise.all([
    Wine.bulkCreate(wineData),
  ])
    
  console.log(`seeded ${wines.length} wines`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed