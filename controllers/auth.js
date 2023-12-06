const pool = require('../db/conn')
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

const loadRegisterPage = (request, response) => {
    //use template engine
    return response.status(200).render('register.ejs')
}

const userRegister = async (request,response) => {
    const { fullname: inputFullName, username: inputUsername, email: inputEmail, password: inputPassword } = request.body;
    if(!inputFullName || !inputUsername || !inputEmail || !inputPassword)
        return response.status(400).json({ status:"error", message: 'Missing required fields' });
    
    
    //check if the email or username is already registered
    try {
        var dbResult = await pool.query('SELECT * FROM users WHERE email = $1 ', [inputEmail]);
        if(dbResult.rows.length > 0) 
            return response.status(409).json({status:"error",message:"Email already registered."})
        
        dbResult = await pool.query('SELECT * FROM users WHERE username = $1 ', [inputUsername]);
        if(dbResult.rows.length > 0) 
            return response.status(409).json({status:"error", message:"Username already taken."})

        //if no problem, insert user
        dbResult = await pool.query('INSERT INTO users(fullname, username, email, password) VALUES ($1,$2,$3,$4) RETURNING *;', [inputFullName, inputUsername, inputEmail, hashPassword(inputPassword)]);
        if (dbResult.rowCount === 1)
            return response.status(201).json({status:"success", message: "User created successfully"});

        return response.status(500).json({status:"error", message:"Something went wrong"})
 
    }
    
    catch (error) {
        console.error('Error executing query:', error);
        response.status(500).json({status:"error", message:"Something went wrong"});
    }
}


const loadSigninPage = (request,response) => {
    return response.status(200).render('login.ejs', {status:"", message:"Please enter your credentials."})
}

const userSignin = async (request, response) => {
    const {email:inputEmail, password:inputPassword} = request.body
   
    if(!inputEmail || !inputPassword)
        return response.status(400).json({ status:"error", message: 'Missing required fields' });
    
    try {
        var dbResult = await pool.query('SELECT * FROM users WHERE email = $1 ', [inputEmail]);
        if(dbResult.rows.length < 1) 
            return response.status(401).json({status:"error", message: "Unable to sign in"})
        
        if (comparePassword(inputPassword, dbResult.rows[0].password)) {
            const accessToken = generateToken(dbResult.rows[0].id);
            return response.status(200).send({
                status: 'success',
                data: {accessToken}
            });
            console.log('A user signed in: ' + inputEmail)
        }
        return response.status(401).json({status:"error", message: "Unable to sign in"})
    }
    
    catch (error) {
        console.error('Error executing query:', error);
        response.status(500).json({status:"error", message:"Something went wrong"});
    }
}

const logOut = async (request, response) => {
    response.clearCookie("accessToken").render('login.ejs', {status:"", message:""});
}

module.exports = {
    loadRegisterPage,
    loadSigninPage,

    userRegister, 
    userSignin,

    logOut
}