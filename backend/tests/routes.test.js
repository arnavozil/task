const app = require('../server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { User } = require('../helpers/db');
const { testDatabase } = require('../config.json');
const bcrypt = require('bcryptjs');


beforeEach(done => {
    mongoose.connect(testDatabase, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, done);
});

test('Create And Login User', async () => {
    const user = await User.create({ username: 'arnav', hash: bcrypt.hashSync('123456', 10) });

    await supertest(app)
        .post('/users/login')
        .send({ username: 'arnav', password: '123456' })
        .expect(200)
        .then(response => {
            expect(response.body.message === '').toBeTruthy();
        });
});


afterEach(done => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(done);
    });
});