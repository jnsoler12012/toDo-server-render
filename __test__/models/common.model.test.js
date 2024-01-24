
import { commonModel, commonOptions } from '../../src/api/models/common.model'


describe('src/models/common', () => {
    test("should contain expected attributtes for common", async () => {

        expect(commonOptions).toEqual({
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        })
    })
})