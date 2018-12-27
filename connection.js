const MongoClient = require('mongodb').MongoClient;

class Connection {
	static connectToMongo(){
		if(this.database) return Promise.resolve(this.database)
			return MongoClient.connect(this.url, this.options).then(db => this.db = db)
	}
}

Connection.db = null
Connection.url = 'mongodb://localhost:27017/briandb'
Connection.options = {
	bufferMaxEntries:   0
    reconnectTries:     5000,
}

module.exports = { Connection }