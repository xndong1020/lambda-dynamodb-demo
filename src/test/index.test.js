const chai = require('chai')
const expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const AWS = require('aws-sdk-mock')

const { handler } = require('../index')

/**
 * Unit test
 */
describe(`Unit test handler from index`, () => {
  it(`should return error message if _id is not provided`, async () => {
    const result = await handler({ _id: null })
    expect(result.statusCode).to.equal(400)
    expect(result.body).to.equal(`Invalid request format. '_id' field missing`)
  })

  it(`docClient.get method should be called with correct params`, done => {
    const getQuerySpy = sinon.spy()
    AWS.mock('DynamoDB.DocumentClient', 'get', getQuerySpy)

    try {
      handler({ _id: '123456' })
      expect(getQuerySpy).to.have.been.calledOnceWith({
        TableName: 'acmjobs',
        Key: { _id: '123456' },
      })
      done()
    } catch (err) {
      expect(err).to.not.exist
    }
  })

  it(`should return response if DocumentClient returns response`, async () => {
    AWS.restore('DynamoDB.DocumentClient')

    AWS.mock('DynamoDB.DocumentClient', 'get', Promise.resolve(`Fake response`))

    try {
      const result = await handler({ _id: '123456' })
      expect(result).to.exist
      expect(result.statusCode).to.equal(200)
      expect(result.body).to.equal('Fake response')
    } catch (err) {
      expect(err).to.not.exist
    }
  })

  it(`should return error message if DocumentClient returns error`, async () => {
    AWS.restore('DynamoDB.DocumentClient')

    AWS.mock(
      'DynamoDB.DocumentClient',
      'get',
      Promise.reject(new Error(`fake error message`))
    )

    try {
      await handler({ _id: '123456' })
    } catch (err) {
      expect(err).to.exist
      expect(err.message).to.equal('fake error message')
    }
  })
})
