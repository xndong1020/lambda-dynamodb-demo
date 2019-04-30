const { handler } = require('./index')

handler({ _id: 123456 })
  .then(data => console.log(data))
  .catch(err => console.log(err))
