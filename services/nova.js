/**
 * Declaracion de la clase.
 */
/* DB */
 
 /* Models */
var UserSchema = require('../models/user');

var db = require('../dbconnection')

class Nova {

	/**
     * Main medthod to init our class
     *
     * @return void.
     */
	constructor(superdb){
		this.db = superdb;
		this.config = null;
	}

	getdbase(){
		return this.db;
	}
	
}

module.exports = Nova

