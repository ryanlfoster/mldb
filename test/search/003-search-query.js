var mldb = require("../../mldb"),
    tests = exports,
    ensure = require('ensure'), 
    assert = require('assert'),
    winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({ filename: 'logs/003-search-query.log' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/003-search-query.log' })
  ]
});

tests.search = function(callback) {
  var db = new mldb(); // default options
  db.setLogger(logger);
  
  // add three docs to the collection
  var col = {collection: "searchcol"};
  var uris = ["/search/1","/search/2","/search/3"];
  db.save({name:"first whippet"},uris[0],col,function(result) {
    assert(!result.inError,"Error saving doc 1");
    db.save({name:"second squirrel"},uris[1],col,function(result) {
      assert(!result.inError,"Error saving doc 2");
      db.save({name:"third wolf"},uris[2],col,function(result) {
        assert(!result.inError,"Error saving doc 3");
        
        logger.debug("TEST: SEARCH: Third save complete. Results object: " + JSON.stringify(result));
        // get docs in collection
        db.search("squirrel",function(result) {
          // ensure there are 3
          logger.debug("TEST: SEARCH results object: " + JSON.stringify(result));
          if (undefined == result.doc) {
            callback(false);
          } else {
            var isOne = (1==result.doc.total);
            assert(isOne,"There should only be one document with squirrel in " + col.collection);
          
            if (isOne){
              // now remove docs in collection
              db.delete(uris[0],function(result) {
                assert(!result.inError,"Error deleting doc 1");
                db.delete(uris[1],function(result) {
                  assert(!result.inError,"Error deleting doc 2");
                  db.delete(uris[2],function(result) {
                    assert(!result.inError,"Error deleting doc 3");
                    logger.debug("TEST: SEARCH returning true for success");
                    callback(true);
                  });
                });
              });
            }
          }
        });
      });
    });
  });
};

tests.search_ok = function(t) {
  assert.ok(t);
};

ensure(__filename, tests, module,process.argv[2]);
