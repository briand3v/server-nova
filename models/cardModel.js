

const CardSchema = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required : ['accid','type','date'],
			properties: {
				_userid: {
					bsonType: 'objectId'
				},
				type: {
					bsonType: 'string',
					description: 'card type'
				},
				title: {
					bsonType: 'string',
					description: 'Title card'
				},
				desc: {
					bsonType: 'string',
					description: 'Card description'
				},
				date: {
					bsonType: 'int',
					description: 'Creation date'
				},
				// images: {
				// 	// add images
				// },
				// records: {
				// 	// add audios
				// }
				message: {
					bsonType: 'string',
					description: 'Card message'
				},
				duedate: {
					bsonType: 'int',
					description: 'Due date card optional'
				},
				// minihelpers: {
				// 	// think about ir
				// }
				design: {
					bsonType: 'string',
					description: 'Card design'
				}
				
			}
		}
	}
}

module.exports = CardSchema