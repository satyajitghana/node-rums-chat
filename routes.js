'use strict'

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./functions/register');
const login = require('./functions/login');
const users = require('./functions/users');
const getChat = require('./functions/getChat');
const getMessages = require('./functions/getMessages');
const sendMessage = require('./functions/sendMessage');
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

    router.post('/send_message/:id', (req, res) => {
        const chatID = req.params.id;
        const from = req.body.from;
        const to = req.body.to;
        const text = req.body.text;

        sendMessage(chatID, from , to, text)
            .then(result => {
                res.status(result.status).json({ message : result.message });
            })
            .catch(err => res.status(err.status).json({ message : result.message }));
    });

    // please for god's sake *NEVER* have this as a get request - shadowleaf (satyajit_ghana)
    router.get('/get_chats/:id', (req, res) => {
        // add the check token here, currently this is insecure, and should be fixed ASAP - shadowleaf (satyajit_ghana)
        var regNo = req.params.id;
        getChat.getDMs(regNo)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json({ message: err.message }));
    });

    router.get('/users/:id', (req, res) => {
        var regNo = req.params.id;
        users.getUser(regNo)
            .then(result => res.json({message : result}))
            .catch(err => res.status(err.status).json({ message : err.message }));
    });

    router.get('/users', (req, res) => {
        users.getUsers()
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json({ message : err.message }));
    });

    // Please don't use get here also, or secure the connection with HTTPS - shadowleaf (satyajit_ghana)
    router.get('/get_messages/:id', (req, res) => {
        var chatID = req.params.id;
        getMessages.getChat(chatID)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json({ message : err.message }));
    });

    router.get('*', (req, res) => {res.status(404).json({message : 'This page doesn\'t exist, what ya doing bruh ?'})});

    const checkToken = (req) => {
        const token = req.headers['x-access-token'];
        if (token) {
            try {
                var decoded = jwt.verify(token, config.secret);
                return decoded.message === req.params.id;
            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    }
};

module.exports = router;