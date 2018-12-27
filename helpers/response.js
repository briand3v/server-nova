const response = {

	data: (req, res , data) =>{
		res.status(200).json(data)
	},
	forbidden: (req, res, err) => {
        res.status(403).json({
            error: err || 'Forbidden'
        });
    },

    unauthorized: (req, res , err) => {
        res.status(401).json({
            error: err || 'TokenExpired' 
        })
    },

    notFound: (req, res, err) => {
        res.status(404).json({
            error: err || 'Not found'
        });
    },

    unprocessable: (req, res, err) => {
        res.status(422).json({
            error: err || 'Unprocessable'
        });
    },

    unexpectedError: (req, res, err) => {
        console.log(req.method, req.path, err);
        res.status(500).json({
            error: 'Unexpected error'
        });
    }
}

module.exports = response;