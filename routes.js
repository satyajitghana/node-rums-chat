'use strict'

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./functions/register');
const login = require('./functions/login');
const config = require('./config/config.json');

const router = (router) => {
    router.get('/', (req, res) => res.end('RUMS Chat end-Point'));

    router.post('/authenticate', (req, res) =>{
        const credentials = auth(req);
        if (!credentials) {
            res.status(400).json({message: 'Invalid Request !'});
        } else {
            login.loginUser(credentials.name, credentials.pass)
                .then(result => {
                    const token = jwt.sign(result, config.secret, {expiresIn: 1440});
                    res.status(result.status).json({ message: result.message, token: token });
                })
                .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });

    router.post('/users', (req, res) => {

        const regNo = req.body.regNo;
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		if (!regNo || !name || !email || !password || !name.trim() || !regNo.trim() || !email.trim() || !password.trim()) {
			res.status(400).json({ message: 'Invalid Request !' });
		} else {
			register.registerUser(regNo, name, email, password)
			.then(result => {
				res.setHeader('Location', '/users/'+regNo);
				res.status(result.status).json({ message: result.message })
			})
			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
};

module.exports = router;