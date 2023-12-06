const jwt = require('jsonwebtoken');
require('dotenv/config');

const generate = (id, isAdmin=false) => jwt.sign({ id,isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '1d'});

const decode = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    generate,
    decode
}