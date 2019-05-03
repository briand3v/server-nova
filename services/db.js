const MongoClient = require('mongodb').MongoClient;

const dbservice = {
	config: {
		poolSize: 10,
		useNewUrlParser: true
	},
	supernova: null,
	db: null,
	connect : (done) => {
		MongoClient.connect(process.env.DB_URI,this.config,(err,dbase) => {
			if(err) return done(err)

			dbservice.db = dbase.db(process.env.BD_NAME)
			console.log('[v] Conection established to '+process.env.DB_NAME+'!')
			done(null);
		})
	},
	getdb: () => {
		return dbservice.db
	}
}

module.exports = dbservice