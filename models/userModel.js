

const UserSchema = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required : ['name','password','email'],
			properties: {
				name: {
					bsonType: 'string',
					description: 'must be a string an required'
				},
				lastname: {
					bsonType: 'string',
					description: 'must be a string an required'
				},
				country: {
					bsonType: 'string',
					description: 'country name'
				},
				age: {
					bsonType: 'int',
					minimun: 16,
					maximun: 90,
					exclusiveMaximum: false,
					description: 'age is a number'
				},
				email: {
					bsonType: 'string',
					description: 'email'
				},
				password: {
					bsonType: 'string',
					description: 'password is a string an required'
				}
			}
		}
	}
}

module.exports = UserSchema;