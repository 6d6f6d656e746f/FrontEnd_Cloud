const fetch = require('node-fetch');

const BASE = 'http://localhost:5173/api';

async function run() {
  console.log('GET /movies');
  console.log(await (await fetch(BASE + '/movies')).text());

  console.log('\nPOST /genres');
  const g = await (await fetch(BASE + '/genres', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name: 'UI-Test-Genre', description: 'Created by test'}) })).text();
  console.log(g);

  console.log('\nPOST /movies');
  const movie = {
    title: 'API Test Movie', description: 'Created by automated test', duration: 90, genre:['UI-Test-Genre'], director: 'Tester', releaseDate: '2025-01-01', rating: 6.5
  };
  const mres = await (await fetch(BASE + '/movies', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(movie) })).text();
  console.log(mres);
}

run().catch(e => console.error(e));
