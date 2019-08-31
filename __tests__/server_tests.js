const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');

describe('testing server.js', ()=> {
   

    describe('basic test of server setup', () => {
        //test that it's using the right environment, testing not development 
        it('should set the testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
    });

    describe('GET requests', () => {

        it('making a GET request with / should return 200 ok',  () => {
            return request(server).get('/')
            .then(res => {
            expect(res.status).toBe(200);
             })
        })
    });

    describe('POST /api/auth/register', () => {
        beforeEach(async () => {
            await db("users").truncate();
          });

        it('should return 201 indicating that account was created - Successful Registration', async () => {
            let res = await request(server).post("/api/auth/register")
            .send({
              username: "sherlock",
              password: "irene"
            });
            expect(res.status).toBe(201);
        })

        it('should return 404 because you cannot create account without password', async () => {
            let res = await request(server).post("/api/auth/register")
            .send({
              username: "watson"
            });
            expect(res.status).toBe(404);
        })
    })

    describe('POST /api/auth/login and /api/auth/register - good register but fail login', () => {
       

        it('should return 201 indicating that account was created - Successful Registration', async () => {
            //clear db and create account
            await db("users").truncate();
         
            let res = await request(server).post("/api/auth/register")
            .send({
              username: "sherlock",
              password: "irene"
            });
            expect(res.status).toBe(201);
        })

        //Put wrong PW in results in 401 error
        it('should return 401 because password is incorrect', async () => {
            let res = await request(server).post("/api/auth/login")
            .send({
              username: "sherlock",
              password: "moriarty"
            });

            expect(res.status).toBe(401);
        })

        //Put no username results in 404 error, 'Username or password description is missing.'
        it('should return 404 because you are missing username; this is validateUser middleware in routh-auther.js', async () => {
            let res = await request(server).post("/api/auth/login")
            .send({

              password: "iren"
            });

            expect(res.status).toBe(404);
        })



    });

    describe('POST registration and then login attempt to get  then jokes', () => {

        it('should return 201 indicating that account was created', async () => {
            await db("users").truncate();
            let res = await request(server).post("/api/auth/register")
            .send({
              username: "sherlock",
              password: "irene"
            });

            expect(res.status).toBe(201);
        })

        it('should return 200 indicating successful login', async () => {
            let res = await request(server).post("/api/auth/login")
            .send({
              username: "sherlock",
              password: "irene"
            });

            expect(res.status).toBe(200);
        })

        it('should get a jokes returned 401', async () => {
            let res = await request(server).get("/api/jokes")

            expect(res.status).toBe(401);
        })
    });

    describe('GET jokes but no login should return 401 error', () => {
        it('should get a 401 error because you are not logged in', async ()=>{
            let res = await request(server).get("/api/jokes")

            expect(res.status).toBe(401);
        })
    })


});