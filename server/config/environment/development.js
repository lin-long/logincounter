'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri:    'mongodb://cb101:test@kahana.mongohq.com:10029/app30180217' ||
            //'mongodb://localhost/lin1711-dev' ||
            process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME 
  },

  seedDB: true
};
