const chai = require('chai')
const expect = chai.expect

const { handler } = require('../index')

/**
 * Integration Tests
 */
describe(`Integration test handler from index`, () => {
  it(`should return correct response with correct _id value`, async () => {
    const result = await handler({ _id: '123456' })
    console.log('Integration test', result)
    expect(result.statusCode).to.equal(200)
    expect(result.body).to.be.not.undefined
    expect(result.body.Item).to.be.not.undefined
    expect(result.body.Item.ID_Category).to.be.equal('Test_category')
    expect(result.body.Item.ID_Type).to.be.equal('Test_Type')
  })
})
