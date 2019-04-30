const db = require('../server/db/index');
const Wine = require('../server/db/models/Wine');
const wineData = require('./winemag-data-130k-v2.json');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const Wines = await Promise.all(
    wineData.map((wine, i) => {
      if (i >= 0 && i < 30000) {
        return Wine.create(wine);
      }
    }),

    wineData.map((wine, i) => {
      if (i >= 30001 && i < 60000) {
        return Wine.create(wine);
      }
    }),

    wineData.map((wine, i) => {
      if (i >= 60001 && i < 90000) {
        return Wine.create(wine);
      }
    }),

    wineData.map((wine, i) => {
      if (i >= 90001 && i < 130000) {
        return Wine.create(wine);
      }
    })
  );

  console.log(`seeded ${Wines.length} wines`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
