/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  let valid_id;

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('1. Test POST /api/books with title', function(done) {
        chai
        .request(server)
        .post('/api/books')
        .send({
            "title": "1. Functional test @" + new Date(),
           
        })
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json')
            assert.exists(res.body.title, "1.functional test @");
            assert.include(res.body._id, "");
            valid_id = res.body._id;
            done();
        });
      });
      
      test('2.Test POST /api/books with no title given', function(done) {
        chai
        .request(server)
        .post('/api/books')
        .send({
            "title": "",
           
        })
        .end(function (err, res) {
          console.log(res.text);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html')
            assert.equal(res.text, "missing required field title");
            done();
        });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('3. Test GET /api/books',  function(done){
        chai
        .request(server)
        .get('/api/books')

        .end(function (err, res) {
          //console.log(res.body);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.isArray(res.body,"");
            done();
        });
      });
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('4. Test GET /api/books/[id] with id not in db',  function(done){
        chai
        .request(server)
        .get('/api/books/'+ undefined) 
    
        .end(function (err, res) {
          //console.log(res.body);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text,"no book exists");
            done();
        });
      });
      
      test('5. Test GET /api/books/[id] with valid id in db',  function(done){
     //console.log(valid_id);
        chai
        .request(server)
        .get('/api/books/'+valid_id)
        // .send("_id", valid_id)
        .end(function (err, res) {
         // console.log(res.body);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body._id,valid_id);
            assert.exists(res.body.title,"1. Functional test @");
            done();
        });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('6. Test POST /api/books/[id] with comment', function(done){
        chai
        .request(server)
        .post('/api/books/'+valid_id)
        .send({
            comments: "Test 6"
           
        })
        .end(function (err, res) {
          console.log("here:",res.body);  
            assert.equal(res.status, 200);
            // assert.equal(res.type, 'application/json')
            // assert.exists(res.body.title, "1.functional test @");
            // assert.equal(res.body._id, valid_id);
            // assert.include(res.body.comments, "Test 6", "Test 6 in comments array");
            done(); 
        });
      });

      // test('Test POST /api/books/[id] without comment field', function(done){
      //   chai
      //   .request(server)
      //   .post('/api/books')
      //   .send({
      //       "title": "1. Functional test @" + new Date(),
           
      //   })
      //   .end(function (err, res) {
      //       assert.equal(res.status, 200);
      //       assert.equal(res.type, 'application/json')
      //       assert.exists(res.body.title, "1.functional test @");
      //       assert.include(res.body._id, "");
      //       valid_id = res.body._id;
      //       done();
      //   });

      // test('Test POST /api/books/[id] with comment, id not in db', function(done){
      //    chai
      //   .request(server)
      //   .post('/api/books')
      //   .send({
      //       "title": "1. Functional test @" + new Date(),
           
      //   })
      //   .end(function (err, res) {
      //       assert.equal(res.status, 200);
      //       assert.equal(res.type, 'application/json')
      //       assert.exists(res.body.title, "1.functional test @");
      //       assert.include(res.body._id, "");
      //       valid_id = res.body._id;
      //       done();
      //   });
      
    });

    // suite('DELETE /api/books/[id] => delete book object id', function() {

    //   test('Test DELETE /api/books/[id] with valid id in db', function(done){
    //     //done();
    //   });

    //   test('Test DELETE /api/books/[id] with  id not in db', function(done){
    //     //done();
    //   });

    // });

  });

});
