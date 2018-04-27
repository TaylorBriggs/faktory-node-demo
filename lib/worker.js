const faktory = require('faktory-worker');

exports.start = function() {
  faktory.register('MyTestJob', (...args) => {
    console.log('processing job with args:', args);
    return 'done';
  });

  return faktory.work();
};
