const UserModel = require("../../modules/dataBase/user.js");


describe('UserModel', () => {

    const mock = {
        name: 'peterNameTest',
        id: 'peterIdTest',
        username: 'peterUsernameTest'
    }

    it.skip('userModel create()', (done) => {
        UserModel.create(mock).then(
            (res) => {
                console.log('res: ', res)
                done()
            },
            (err) => console.log(err)
        )
    })

    it('userModel getByCondition()', (done) => {

        const condition = { username: mock.username };

        UserModel.getByCondition(condition).then(
            (res) => {
                expect(mock['username']).toBe(res['username'])
                expect(mock['id']).toBe(res['id'])
                expect(mock['name']).toBe(res['name'])
                done()
            },
            (err) => console.log(err)
        )
    })
    
})