var MongoClient = require('mongodb').MongoClient;

// const dbservice = {
// 	supernova: null,
// 	db: null,
// 	connect : (done) => {
// 		client.connect((err) => {
// 			if(err) {
// 			console.log(err)
// 			return done(err);}
// 			dbservice.db = client.db(process.env.BD_NAME)
// 			console.log('[v] Conection established to '+process.env.DB_NAME+'!')
// 			done(null);
// 		})
// 	}
// }

class db {
	constructor(){
		this.db = null;
		this.config = {
			poolSize: 10,useNewUrlParser: true
		};
		this.supernova = null;
		this.URI = process.env.DB_URI;
		this.servername = process.env.DB_NAME;
		this.client = new MongoClient(this.URI,this.config)
	}

	initconection(done){
		this.client.connect((err) =>{
			if(err){
				console.log('[X] Fatal connection +++ '+err)
				return done(err)
			}
			this.db = this.client.db(this.servername)
			console.log('[v] Conection established to '+this.servername+'!')
			done(null)
		})
	}

	getdb(){
		return this.db;
	}
	
}


class Singletondb {
	constructor(){
		if(!Singletondb.instance){
			Singletondb.instance = new db();
		}
	}
	superdb(){
		return Singletondb.instance;
	}
}



module.exports = Singletondb;