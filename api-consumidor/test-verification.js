const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testEndpoints() {
  console.log('--- Starting Verification ---');

  // 1. Test GET /cartera
  try {
    console.log('Testing GET /cartera...');
    const resGet = await axios.get(`${BASE_URL}/cartera`);
    console.log('[SUCCESS] GET /cartera status:', resGet.status);
    // console.log('Data:', resGet.data);
  } catch (err) {
    console.error('[FAILED] GET /cartera:', err.message);
  }

  // 2. Test POST /cartera
  try {
    console.log('\nTesting POST /cartera...');
    const resPost = await axios.post(`${BASE_URL}/cartera`, {
      nombre: 'daniel_test',
      deuda: 200
    });
    console.log('[SUCCESS] POST /cartera status:', resPost.status);
    console.log('Response:', resPost.data);
  } catch (err) {
    console.error('[FAILED] POST /cartera:', err.message);
  }

  // 3. Test PUT /cartera/1
  try {
    console.log('\nTesting PUT /cartera/1...');
    const resPut = await axios.put(`${BASE_URL}/cartera/1`, {
      nombre: 'graciela_test',
      deuda: 200
    });
    console.log('[SUCCESS] PUT /cartera/1 status:', resPut.status);
    console.log('Response:', resPut.data);
  } catch (err) {
    console.error('[FAILED] PUT /cartera/1:', err.message);
  }

  console.log('\n--- Verification Complete ---');
}

testEndpoints();
