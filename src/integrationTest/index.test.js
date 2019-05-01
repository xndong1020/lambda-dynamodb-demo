const chai = require('chai')
const expect = chai.expect

const { handler } = require('../index')

/**
 * Integration Tests
 */
describe(`Integration test handler from index`, () => {
  it(`should return correct response with correct _id value`, async () => {
    try {
      const result = await handler({ _id: '123456' })
      expect(result.statusCode).to.equal(200)
      expect(result.body).to.exist
      expect(result.body.Item).to.exist
      expect(result.body.Item.ID_Category).to.be.equal('Test_category')
      expect(result.body.Item.ID_Type).to.be.equal('Test_Type')
    } catch (err) {
      expect(err).to.not.exist
    }
  })

  it(`should return error response with incorrect _id value`, async () => {
    try {
      const result = await handler({ _id: '123' })
      expect(result.statusCode).to.equal(200)
      expect(result.body).to.exist
      expect(result.body.Item).to.not.exist
    } catch (err) {
      expect(err).to.not.exist
    }
  })
})
