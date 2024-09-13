const sql= require('mssql');

const config={
       user: 'syrehan',
       password :'b93500082TS',
       server :'USHYDSYREHAN6',
       database:'firstDB',
       port:1443,
       options :{
            encrypt:false,
            trustServerCertificate:true
       }
};
async function connecttoDatabse(){
      try{
        const pool= await sql.connect(config);
        console.log("Connected to SQL Server");
        return pool;
      } catch(err){
        console.log("Database Connection failed : ",err);
        throw err;
      }
}