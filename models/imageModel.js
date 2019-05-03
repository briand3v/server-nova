

const ImageSchema = {
	validator: {
		$jsonSchema: {
			bsonType: 'json',
			required: ['_userId, path'],
			properties: {
				_userId: {
					bsonType: 'objectid'
				},
				path: {
					bsonType: 'string',
					description: 'the path of the localization of image'
				},
				index: {
					bsonType: 'int',
					description: 'image index'
				}
			}
		}
	}
}

module.exports = ImageSchema