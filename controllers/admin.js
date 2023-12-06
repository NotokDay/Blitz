const pool = require('../db/conn')

const loadAdminPage = async (request, response) => {
    try {
        var dbProducts = await pool.query('SELECT * FROM products');
	try {
	var dbUsers = await pool.query('SELECT * FROM users');
	if(dbUsers.rows.length > 0) return response.render('adminPanel', {products: dbProducts.rows, users:dbUsers.rows})
    }catch{
	console.error('Error executing query:', error);
	return response.status(500).json({status:"error", message:"Something went wrong"});
    }
}
    
    catch (error) {
        console.error('Error executing query:', error);
        response.status(500).json({status:"error", message:"Something went wrong"});
    }
}

const loadNewProductPage = async(request, response) => {
    return response.render('newProduct', {status:"", message:""})
}

const addNewProduct = async(request, response) => {
    const { title: inputTitle, brand: inputBrand, category: inputCategory, description: inputDescription, 
        price: inputPrice, rating:inputRating,stock:inputStock, discountPercentage:inputDiscountPercentage } = request.body;

    if(!inputTitle || !inputBrand || !inputCategory || !inputDescription || !inputPrice || !inputRating || !inputStock || !inputDiscountPercentage)
        return response.status(400).json({ status:"error", message: 'Missing required fields' });
    
    //make sure data types are ok
    if (isNaN(inputPrice)) return response.status(400).json({ status:"error", message: 'Price field should be a number' });
    if (isNaN(inputRating)) return response.status(400).json({ status:"error", message: 'Rating field should be a number' });
    if (isNaN(inputStock)) return response.status(400).json({ status:"error", message: 'Stock field should be a number' });
    if (isNaN(inputDiscountPercentage)) return response.status(400).json({ status:"error", message: 'Discount percentage field should be a number' });
    
    var currentMaxId = 1000000;
    try{
        var getMaxId = await pool.query('SELECT MAX(id) FROM products')
        currentEmptyId = getMaxId.rows[0].max + 1
    }catch{

    }

    try {
        var dbResult = await pool.query(`INSERT INTO products (id, brand, category, description, discountPercentage, price, rating, stock, title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
            currentEmptyId, inputBrand, inputCategory, inputDescription, inputDiscountPercentage, inputPrice, inputRating, inputStock, inputTitle, 
        ])

        return response.render('newProduct.ejs', {status:"success", message:"New product added successfully."})
    }
    
    catch (error) {
        console.error('Error executing query:', error);
        response.status(500).json({status:"error", message:"Something went wrong"});
    }
}

const makeAdmin = async (request, response) => {
    const {id: inputId} = request.body

    try{
        var dbResult = await pool.query(`SELECT isadmin FROM users WHERE id=${inputId}`)
    }catch (error){
        return response.status(500).send({status:"error", message:'Error in SQL query'})
    }
    
    try{
        if(dbResult.rows.length < 1) return response.send({status:"error", message:"Invalid user ID"})

        if(dbResult.rows[0].isadmin  === true) return response.status(400).send({status:"error", message:"User is already an admin"})
        
        var dbResult = await pool.query('UPDATE users SET isadmin=true WHERE id=$1', [inputId])

        return response.status(200).send({status:"success", message:"Added user to administrators list"})
    }catch(error){
        console.error('Error executing query:', error);
        response.status(500).json({status:"error", message:"Something went wrong"});
    }
    
}

module.exports = {loadAdminPage, loadNewProductPage, addNewProduct, makeAdmin}

