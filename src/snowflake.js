const Snowflake = require('node-snowflake');

module.exports = function() {
  const app = this;
  const datacenterId = app.get('datacenterId');
  const workerId = app.get('workerId')

  app.set('snowflakeWorker', new Snowflake.Worker({
    datacenterId: datacenterId,
    workerId: workerId,
    retry: true
  }));

}
