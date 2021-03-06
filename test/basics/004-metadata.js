var mldb = require("../../mldb"),
    tests = exports,
    ensure = require('ensure'), 
    assert = require('assert'),
    winston = require('winston');

     var logger = new (winston.Logger)({
       transports: [
          new winston.transports.File({ filename: 'logs/004-metadata.log' })
       ],
       exceptionHandlers: [
          new winston.transports.File({ filename: 'logs/004-metadata.log' })
       ]
     });

tests.metadata = function(callback) {
  var db = new mldb(); // default options
  db.setLogger(logger);
  
  logger.debug("****** Creating doc");
  db.save({from: "test", to: "all", body: "wibble"},"/meta/1", {collection: "metatest"},function(result) {
    assert(!result.inError,"Save should not be in error: " + JSON.stringify(result.error));
    // now fetch it
    logger.debug("****** Doc created. Fetching doc.");
    db.metadata("/meta/1", function(result) {
      logger.debug("TEST: METADATA: " + JSON.stringify(result));
      assert(!result.inError,"Metadata should not be in error: " + JSON.stringify(result.error));
      // now print it
      logger.debug("****** Doc content: " + JSON.stringify(result.doc));
      
      assert("metatest"==result.doc.collections[0],"Collection should be metatest");
      
      // now delete it
      logger.debug("****** deleting doc");
      db.delete("/meta/1", function(result) {
        assert(!result.inError,"Delete should not be in error: " + JSON.stringify(result.error));
        logger.debug("****** Doc deleted");
        //assert.isNull(result.doc);
        callback(!result.inError);
      });
    });
  });
};

tests.metadata_ok = function(t) {
  assert.ok(t);
};


ensure(__filename, tests, module,process.argv[2]);
