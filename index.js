const worker = require('./lib/worker');
const jobs = require('./lib/jobs');

worker.start().then(() => {
  jobs.run();
});
