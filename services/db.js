const MongoClient = require('mongodb').MongoClient;

class DB{

	constructor(){
		this.db = null;
		this.url = process.env.DB_URI;
		this.options = {
			useNewUrlParser: true,
			bufferMaxEntries: 0,
			reconnectTries: 5000
		}
	}

	econnection(){
		if(this.db) return new Promise.resolve(this.db)
			return MongoClient.connect(this.url, this.options).then((client)=> this.db = client.db(process.env.BD_NAME))
	}
	dbase(){
		return this.db;
	}
	
}

module.exports = DB