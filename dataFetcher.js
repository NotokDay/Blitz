const pool = require('./db/conn')

function fetcher(){
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(async res => {
        //console.log(res.products[0])
        const products = res.products
        
        products.forEach(async (product) => {
            try {
                var dbResult = await pool.query(`INSERT INTO products (id, brand, category, description, discountPercentage, price, rating, stock, thumbnail, title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, 
                [product.id, product.brand, product.category, product.description, product.discountPercentage, product.price, product.rating, product.stock, product.thumbnail, product.title ]);
                        
            }
            
            catch (error) {
                console.error('Error executing query:', error);
                response.status(500).json({status:"error", message:"Something went wrong"});
            }
        });
    })   
    
}

fetcher()