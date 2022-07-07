let chai = require("chai");
let chaiHttp = require("chai-http");
const server = require("../app");

//assertion style 
chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
    // beforeEach((done) => { //Before each test we empty the database
             
    // });
/*
  * Test the /GET route
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                //   res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/GET users', () => {
        it('it should not  GET all the users', (done) => {
        chai.request(server)
            .get('/user')
            .end((err, res) => {
                    res.should.have.status(404);
                    
                //   res.body.length.should.be.eql(0);
                done();
            });
        });
   });

   describe('/GET a user', () => {
        it('it should   GET one user', (done) => {
            let id = 1;
            chai.request(server)
                .get('/users/'+id)
                .end((err, res) => {
                        //status code must be 200
                        res.should.have.status(200);
                        //response must be an object
                        res.body.should.be.a('object');
                        //response object must have id 
                        res.body.should.have.property('id');
                        res.body.should.have.property('name');
                        res.body.should.have.property('age');
                        res.body.should.have.property('active');
                    
                    done();
                });
        });
   });

   describe('/GET a user', () => {
        it('it should give an error', (done) => {
            let id = 15;
            chai.request(server)
                .get('/users/'+id)
                .end((err, res) => {
                        //status code must be 200
                        res.should.have.status(404);
                        res.text.should.be.eq("user with that id doesn't exist");
                    
                    done();
                });
        });
    });

    describe('/POST a user', () => {
        it('it should post a user', (done) => {
            chai.request(server)
                .post('/users')
                .send({name:"athul",age:35,email:"athul@gmail.com"})
                .end((err, res) => {
                        //status code must be 200
                        res.should.have.status(200);
                        res.text.should.be.eq("new user added5");
                    
                    done();
                });
        });
    });

});


