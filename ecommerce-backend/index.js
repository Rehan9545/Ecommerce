const express= require('express');
const app = express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.send("WELCOME TO DELOITTE");
});

const sql= require('msnodesqlv8');
const connectionString= "server=USHYDSYREHAN6;Database=firstDB;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";
query="SELECT * FROM NEWTAB2"
sql.query(connectionString,query,(err,rows)=>{
    
});

app.get('/categories',(req,res)=>{
    query="SELECT * FROM CATEGORIES;"
sql.query(connectionString,query,(err,rows)=>{
    // console.log(rows);
  res.json(rows);
    
});
})
app.get('/products',(req,res)=>{
    query="SELECT * FROM PRODUCTS;"
    sql.query(connectionString,query,(err,rows)=>{
        // console.log(rows);
      res.json(rows);
        
    });
})
app.get('/products/:category',(req,res)=>{

    query=`SELECT P.product_id,P.product_name,P.product_price,P.img_address FROM PRODUCTS AS P,CATEGORIES AS C WHERE C.category_name='${req.params.category}' AND P.category_id=C.Category_id;`
    sql.query(connectionString,query,(err,rows)=>{
     
      res.json(rows);
        
    });
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    // query ='SELECT User_Password FROM USERS WHERE User_Email='email';'
    query=`SELECT User_Password,User_Id FROM USERS WHERE User_Email=\'${email}\';`
    sql.query(connectionString,query,(err,rows)=>{
        if(err){
   
            return res.status(401).json({message:err})
        }
        if(rows.length===0){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        const {User_Password,User_Id }= rows[0];
        if(User_Password===password){
            res.status(200).json({message:"Login Successfull",status:200,"UserId":User_Id})
        }else{
            res.status(401).json({message:"Invalid Credentials"})
        }
    })


})

app.post('/register',(req,res)=>{
    const {email,fullname,password,phone}=req.body;
    query =`INSERT INTO USERS OUTPUT Inserted.User_Id VALUES(\'${fullname}\',\'${email}\',${phone},\'${password}\',0);`
    sql.query(connectionString,query,(err,rows)=>{
        
        if(err){
            res.status(401).json({message:"ERROR"})
        }else{
            const {User_Id}=rows[0];
            res.status(200).json({message:"Registraion Successfull",status:200,User_Id});
        }
    })
})
app.post('/user',(req,res)=>{
    const {User_Id}=req.body;

    query =`SELECT * FROM USERS WHERE User_Id=${User_Id}`
    sql.query(connectionString,query,(err,rows)=>{
        if(err){
            res.status(401).json({message:"ERROR"})
        }else{
        
            res.json(rows[0]);
        }
    })
})

// app.post('/placeOrder',(req,res)=>{
//     const {cart,User_Id}=req.body;
//     const totalPrice = cart.reduce((total, product) => total + product.price, 0);
//     let Order_Id;
//     query=`INSERT INTO ORDERS(User_Id,total_amount) OUTPUT Inserted.Order_Id VALUES (${User_Id},${totalPrice});`
//     sql.query(connectionString,query,(err,rows)=>{
//         if(err){
//             console.log(err);
//             res.status(401).json({message:"ERROR"})
//         }else{
//             console.log("success");
//             Order_Id=rows[0].Order_Id;
//             initiateOrder();
//         }
        
           
        
            
        
//     })
//    function initiateOrder(){
//     console.log("SUCCESS AGAIN");
//     const itemQueries=cart.map(item=>`INSERT INTO order_items(Order_Id,product_id,quantity,price) VALUES(${Order_Id},${item.id},${item.quantity},${item.price})`);
//     sql.query(connectionString,itemQueries.join(''),(err,rows)=>{
//      if(err){
//          res.status(401).json({message:"ERROR"})
//      }else{
//          res.status(200).json({message:"SUCCESS",status:200})
//      }
//     })
//    }
// })
app.post('/placeOrder', async (req, res) => {
    const { cart, User_Id } = req.body;
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
    let Order_Id;

    try {
        // Insert order and get Order_Id
        const orderQuery = `INSERT INTO ORDERS(User_Id, total_amount) OUTPUT Inserted.Order_Id VALUES (${User_Id}, ${totalPrice});`;
        const orderResult = await sqlQuery(connectionString, orderQuery);
        Order_Id = orderResult[0].Order_Id;

        // Insert order items
        const itemQueries = cart.map(item => 
            `INSERT INTO order_items(Order_Id, product_id, quantity, price) VALUES(${Order_Id}, ${item.id}, ${item.quantity}, ${item.price});`
        ).join('');

        await sqlQuery(connectionString, itemQueries);

        // Send success response
        res.status(200).json({ message: "SUCCESS", status: 200 });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "ERROR" });
    }
});

// Helper function to run SQL queries using Promises
function sqlQuery(connectionString, query) {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

app.get('/orders', (req, res) => {
    
    const userId=req.query.id;
    // const userId=1;
 
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
 
    const query = `
        SELECT o.Order_Id, o.User_Id, o.Order_Date, o.total_amount,
               i.product_id, i.quantity, i.price,p.product_name
        FROM orders o
        JOIN order_items i ON o.Order_Id = i.Order_Id
        JOIN products p ON i.product_id = p.product_id
        WHERE o.User_id = ?
        ORDER BY o.order_date DESC;
    `;
 
    sql.query(connectionString, query, [userId], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
 
      
        const orders = result.reduce((acc, row) => {
            if (!acc[row.Order_Id]) {
                acc[row.Order_Id] = {
                    Order_Id: row.Order_Id,
                    User_Id: row.User_Id,
                    Order_Date: row.Order_Date,
                    total_amount: row.total_amount,
                    items: []
                };
            }
            acc[row.Order_Id].items.push({
                product_id: row.product_id,
                product_name:row.product_name,
                quantity: row.quantity,
                price: row.price
            });
            return acc;
        }, {});
 
        res.json(Object.values(orders));
    });
});
const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log("SERVER IS RUNNING ON PORT 5000");
});