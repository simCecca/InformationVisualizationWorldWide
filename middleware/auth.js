const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    //get the token senth from react
    const token = req.header('x-auth-token');

    //chech for token
    if(!token)
        return res.status(401).json({ msg: 'No token, suthorization denied' });

    try{
        //verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //add user from payload
        req.user = decoded;
        next();
    }catch (e) {
        res.status(400).json({ msg: 'Token is not valid'});
    }
}

module.exports = auth;