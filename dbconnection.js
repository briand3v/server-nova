var MongoClient = require('mongodb').MongoClient;
var URI = process.env.DB_URI

const dbservice = {
	supernova: null,
	db: null,
	connect : (done) => {
		MongoClient.connect(URI, { useNewUrlParser: true }, (err, client) => {
			if(err) {
			return done(err);}
			dbservice.db = client.db(process.env.BD_NAME)
			console.log('[v] Conection established to '+process.env.DB_NAME+'!')
			done(null);
		})
	}
} 

module.exports = dbservice;