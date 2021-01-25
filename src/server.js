const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = JSON.parse(fs.readFileSync('../db/database.json', 'UTF-8'));
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

//Check if the user exist in databasee
function isAuthenticated({email,password}){
    return userbd.users .findIndex(user => user.email === email && user.password === password) !== -1;
}


//login to one of the users from ../users/user.json
server.post('/auth/token', (req, res) => {
    console.log("token endpoint called: request body:");
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



server.post('/auth/login' , (req, res) => {
    
    console.log("login endpoint called: request boby:");
    console.log(req.body);
    const  {email, password} = req.body;

    if (req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return
    }
    try{
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if(verifyTokenResult instanceof Error) {
            const status = 401;
            const message = 'Access token not provided';
            res.status(status).json({status, message});
            return
        }
    } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }

    try{
        if(email == "rannier@mobilesaude.com.br" && password == "mobi0406"){
            res.status(200).json(router.login1);
            console.log(router.login1);
        }else if(email == "jean@mobilesaude.com.br" && password == "mobi0406"){
            res.status(200).json(router.login2);
            console.log(router.login2);
        }else {
            const status = false;
            const motivoCritica = 'Login or password wrong';
            res.status(401).json({status, motivoCritica});
        }
    } catch (err) {
        const status = 401
        const message = 'Request time out!';
        res.status(status).json({status, message});
    
    }
})


// trocarSenha
server.post('/auth/trocarSenha', (req, res) => {
    console.log("trocarSenha endpoint called: request body:");
    console.log(req.body);
    const {senhaAtual, novaSenha} = req.body;

    if (req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return
    }
    try{
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if(verifyTokenResult instanceof Error){
            const status = 401
            const message = 'Acess token not provided';
            res.status(status).json({status, message});
            return
        }
    } catch (err) {
        const status = 401;
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }

    try{
        if(senhaAtual == "mobi0406" && novaSenha != ""){
            res.status(200).json(router.trocarSenha);
            console.log('return: ');
            console.log(router.trocarSenha);
        }else{
            const status = false;
            const motivoCritica = "senhaAtual or novaSenha not valid!";
            res.status(401).json({status, motivoCritica});
        }
    } catch (err) {
        const status = 401;
        const message = 'Request time out!';
        res.status(status).json({status, message});
    }

})



// novoUsuario
server.post('/auth/novoUsuario' , (req, res) => {
    
    console.log("novoUsuario endpoint called: request boby:");
    console.log(req.body);
    const  {login, dataNascimento, email} = req.body;

    if (req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return
    }
    try{
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if(verifyTokenResult instanceof Error) {
            const status = 401;
            const message = 'Access token not provided';
            res.status(status).json({status, message});
            return
        }
    } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }

    try{
        if(login == "92188083970" && dataNascimento == "2017-11-05" && email == "derlandy@mobilesaude.com.br"){
            res.status(200).json(router.login1);
            console.log(router.login1);
        }else if(login == "09994497707" && dataNascimento == "1983-01-02" && email == "rafael@samp.com.b"){
            res.status(200).json(router.login2);
            console.log(router.login2);
        }else {
            const status = false;
            const motivoCritica = 'Dados inválidos, verifique os dados informados';
            res.status(401).json({status, motivoCritica});
        }
    } catch (err) {
        const status = 401;
        const message = 'Request time out!';
        res.status(status).json({status, message});
    
    }
})




// reiniciarSenha
server.post('/auth/reiniciarSenha' , (req, res) => {
    
    console.log("reiniciarSenha endpoint called: request boby:");
    console.log(req.body);
    const  {login, dataNascimento, email} = req.body;

    if (req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return
    }
    try{
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if(verifyTokenResult instanceof Error) {
            const status = 401;
            const message = 'Access token not provided';
            res.status(status).json({status, message});
            return
        }
    } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }

    try{
        if(login == "92188083970" && dataNascimento == "2017-11-05" && email == "derlandy@mobilesaude.com.br"){
            res.status(200).json(router.reiniciarSenha);
            console.log(router.reiniciarSenha);
        }else if(login == "09994497707" && dataNascimento == "1983-01-02" && email == "rafael@samp.com.b"){
            res.status(200).json(router.reiniciarSenha);
            console.log(router.reiniciarSenha);
        }else {
            const status = false;
            const motivoCritica = 'Dados inválidos, verifique os dados informados';
            res.status(401).json({status, motivoCritica});
        }
    } catch (err) {
        const status = 401
        const message = 'Request time out!';
        res.status(status).json({status, message});
    
    }
})





// Extrato de Utilização de coparticipação

server.post('/extrato', (req, res) => {
    console.log("extrato endpoint called: request body:");
    console.log(req.body);
    const {mes, ano} = req.body;

    if(req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return;
    }
    try{
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if(verifyTokenResult instanceof Error){
            const status = 401
            const message = 'Acess token not provided';
            res.status(status).json({status, message});
            return
        }
    } catch (err) {
        const status = 401;
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }

    try{
        if(mes == '08' && ano == '1990'){
            res.status(200).json(router.extrato);
            console.log('return: ');
            console.log(router.extrato);
        }else{
            const status = 401;
            const message = "ano and mes don't have extrats!";
            res.status(status).json({status, message});
        }
    } catch (err) {
        const status = 401;
        const message = 'Request time out!';
        res.status(status).json({status, message});
    }
})


//Débitos

server.post('/listaDebitos', (req, res) => {
    console.log("listaDebitos endpoint called: request body:");
    console.log(req.body);
    const {chaveBeneficiario} = req.body;

    if(req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return;
    }
    try{
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if(verifyTokenResult instanceof Error){
            const status = 401
            const message = 'Acess token not provided';
            res.status(status).json({status, message});
            return
        }
    } catch (err) {
        const status = 401;
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }

    try{
        if(chaveBeneficiario == '2320170425162943'){
            res.status(200).json(router.listaDebitos);
            console.log('return: ');
            console.log(router.listaDebitos);
        }else{
            const status = 401;
            const message = `This chaveBeneficiario: ${chaveBeneficiario} dont have debits`;
            res.status(status).json({status, message});
        }
    } catch (err) {
        const status = 401;
        const message = 'Request time out!';
        res.status(status).json({status, message});
    }
})

server.post('/detalheDebito', (req, res) => {
    console.log("detalheDebito endpoint called: request body:");
    console.log(req.body);
    const {tituloCodigo , tituloId} = req.body;

    if(req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return;
    }
    try{
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if(verifyTokenResult instanceof Error){
            const status = 401
            const message = 'Acess token not provided';
            res.status(status).json({status, message});
            return
        }
    } catch (err) {
        const status = 401;
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }

    try{
        if(tituloCodigo == 'MS00590' && tituloId == '590'){
            res.status(200).json(router.detalheDebito);
            console.log('return: ');
            console.log(router.detalheDebito);
        }else{
            const status = 401;
            const message = `This tituloCodigo: ${tituloCodigo} and tituloId: ${tituloId} dont have details debits`;
            res.status(status).json({status, message});
        }
    } catch (err) {
        const status = 401;
        const message = 'Request time out!';
        res.status(status).json({status, message});
    }
})


server.post('/boletoPdf', (req, res) => {
    console.log("boletoPdf endpoint called: request body:");
    console.log(req.body);
    const {tituloCodigo} = req.body;

    if(req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return;
    }
    try{
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if(verifyTokenResult instanceof Error){
            const status = 401
            const message = 'Acess token not provided';
            res.status(status).json({status, message});
            return
        }
    } catch (err) {
        const status = 401;
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }

    try{
        if(tituloCodigo == 'MS00590'){
            res.status(200).json(router.boletoPdf);
            console.log('return: ');
            console.log(router.boletoPdf);
        }else{
            const status = 401;
            const message = `This tituloCodigo: ${tituloCodigo} dont have PDF`;
            res.status(status).json({status, message});
        }
    } catch (err) {
        const status = 401;
        const message = 'Request time out!';
        res.status(status).json({status, message});
    }
})


server.listen(8000, () =>{
    console.log('Run Auth API Server');
})
