// Load the AWS SDK for Node.js
const AWS = require('aws-sdk')
// Set the region
AWS.config.update({ region: 'ap-southeast-2' })
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

exports.handler = async event => {
  const { _id } = event
  const response = {}

  if (!_id) {
    response.statusCode = 400
    response.body = `Invalid request format. '_id' field missing`
    return response
  }

  const params = {
    TableName: 'acmjobs',
    Key: { _id }
  }

  try {
    const result = await docClient.get(params).promise()
    response.statusCode = 200
    response.body = result
  } catch (err) {
    response.statusCode = 400
    response.body = err
  }

  return response
}
