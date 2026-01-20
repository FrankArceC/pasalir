const axios = require('axios');

const UPSTREAM = 'https://venta-omega.vercel.app';

async function testUpstream() {
  console.log('--- Testing UPSTREAM Directly ---');

  // 1. GET
  try {
    console.log(`GET ${UPSTREAM}/cartera`);
    const res = await axios.get(`${UPSTREAM}/cartera`);
    console.log('GET Status:', res.status);
    console.log('GET Data:', JSON.stringify(res.data).substring(0, 100) + '...');
  } catch (err) {
    console.error('GET Failed:', err.message);
    if (err.response) console.error('Status:', err.response.status, 'Data:', err.response.data);
  }

  // 2. POST
  try {
    console.log(`\nPOST ${UPSTREAM}/cartera/`);
    const res = await axios.post(`${UPSTREAM}/cartera/`, {
      nombre: "daniel_test_direct",
      deuda: 200
    });
    console.log('POST Status:', res.status);
    console.log('POST Data:', res.data);
  } catch (err) {
    console.error('POST Failed:', err.message);
    if (err.response) console.error('Status:', err.response.status, 'Data:', err.response.data);
  }
}

testUpstream();
