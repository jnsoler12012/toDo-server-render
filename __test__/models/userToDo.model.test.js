
import { User as UserModel } from '../../src/api/models'



describe('src/models/User', () => {
    test("should contain expected attributtes obj", async () => {
        console.log(UserModel.name);

        const Attributes = UserModel.getAttributes()
        const listAttributes = Object.keys(Attributes).reduce((prev, next) => { prev.push(next); return prev }, [])

        console.log(Attributes, listAttributes);
        expect(UserModel.name).toBe('userToDo')
        expect(listAttributes).toEqual(['id', 'email', 'password', 'createdAt', 'updatedAt'])
    })
})