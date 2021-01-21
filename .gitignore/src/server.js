const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const userbd = JSON.parse(fs.readFileSync('../users/user.json', 'UTF-8'));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = 'RannyZyzzMobileSaude';
const expiresIn = '1h';

//Create token from payload
function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

//Verify the token
function verifyToken(token){
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

//Check if the user exist in database
function isAuthenticated({email,password}){
    return userbd.users.findIndex(user => user.email === email && user.password === password) !== -1;
}


//login to one of the users from ../users/user.json
server.post('/auth/login', (req, res) => {
    console.log("login endpoint called: request body:");
    console.log(req.body);
    const  {email, password} = req.body;
    if(isAuthenticated({email, password}) === false){
        const status = 401;
        const message = 'Incorret email or password'
        res.status(status).json({status, message});
        return
    };

    const access_token = createToken({email, password});
    res.status(200).json({access_token});
});

server.listen(8000, () =>{
    console.log('Run Auth API Server');
})
