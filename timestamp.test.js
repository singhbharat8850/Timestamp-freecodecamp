import test from 'ava';
const request = require('supertest');
const app = require('./../server.js');
 
test('GET 200', async t => {
  const response = await request(app)
    .get('/api/timestamp');
     t.is(response.status, 200)
})
 
test('bad input', async t => {
  const response = await request(app)
    .get('/api/timestamp/badinput');
    t.deepEqual(response.body, {"unix": null, "utc": "Invalid Date"})
  });
 
test('no input', async t => {
  const response = await request(app)
    .get('/api/timestamp/');
    let myday = new Date(parseInt(response.body.unix));
    // get today's timestamp;
    if(
        (!(testRange(parseInt(response.body.unix), Date.now(), 3000)))
        ||(!(myday.toUTCString() === response.body.utc))
        )
      {
      t.fail();
    } else {
      t.pass();
    }
  });
 
test('valid timestamp', async t => {
  const response = await request(app)
  .get('/api/timestamp/91650660000');
  t.deepEqual(response.body, {"unix": 91650660000, "utc": "Sun, 26 Nov 1972 18:31:00 GMT"})
})
 
test('valid date string', async t => {
  const response = await request(app)
  .get('/api/timestamp/2019-04-29');
  t.deepEqual(response.body, {"unix": 1556496000000, "utc": "Mon, 29 Apr 2019 00:00:00 GMT"})
})
 
 
function testRange(firstval, secondval, myrange){
  var diff = firstval - secondval;
  if(diff < 0) diff = diff * -1;
  return (diff < myrange);
}
