const faktory = require('faktory-worker');

let numIterations = 0;
let intervalId;

function pushJob(client, job) {
  if (numIterations < 6)
    return client.push(job);

  console.log('shutting down...');
  client.close();
  console.log('disconnected');
  clearInterval(intervalId);
  process.exit(0);
}

function start(client) {
  console.log('starting up...');
  intervalId = setInterval(() => {
    pushJob(client, {
      jobtype: 'MyTestJob',
      args: [ `id-${++numIterations}`, { type: 'alarm' }  ]
    });
  }, 5000);
}

exports.run = async function() {
  console.log('connecting...');
  const client = await faktory.connect();
  console.log('connected');
  start(client);
  return client;
};
