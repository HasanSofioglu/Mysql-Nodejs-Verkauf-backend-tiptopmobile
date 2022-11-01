

const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express()
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const { markAsUntransferable } = require('worker_threads');





const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'H_.s5392112',
  database : 'VERKAUFDataBase'
});


db.connect((err) => {
  if (err) {
      console.log('Connection error message: ' + err.message);
      return;
  }
  console.log('Connected!')
});
const fileUpload = require('express-fileupload');
 

app.use(express())
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;


  
app.use(express.json());
app.use(cors({credentials: true, origin: 'https://verkaufen.tiptopmobile.de'}));



app.post('/upload/:id', (req, res) => {
  const pid = req.params.id;
  console.log(req.params.id)
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/phoneImg/${pid+".png"}`, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

  return  res.json({ fileName: file.name, filePath: `/phoneImg/${file.name}` });
  });
});

app.post("/api/phone/insert", (req,res)=>{

  const PhoneName =req.body.phoneName
  const PhoneBrand = req.body.phoneBrand
  const PhonePrice_1 = req.body.phonePrice_1
  const PhonePrice_2 = req.body.phonePrice_2
  const PhonePrice_3 = req.body.phonePrice_3
  const PhonePrice_4 = req.body.phonePrice_4

try{

  const sqlInsert=
  "INSERT INTO phones (PhonesBrand,PhonesName,PhonePrice_1,PhonePrice_2,PhonePrice_3,PhonePrice_4) Values (?,?,?,?,?,?);"
   db.query(sqlInsert,[PhoneBrand,PhoneName,PhonePrice_1,PhonePrice_2,PhonePrice_3,PhonePrice_4])


 return console.log("successful insert")

}catch(error){
return console.log(error)

}
 
  
 
})

app.delete("/api/delete/:id", (req,res)=>{
  const PhoneId = req.params.id;

console.log(PhoneId)
try{

  const sqlDelete=
  "DELETE FROM phones WHERE id = ?;"
   db.query(sqlDelete,[PhoneId], (err) => {
    if(err){return console.log(err)}
 
   return console.log("successful delete")
  }
  
  )



}catch(error){
console.log(error)

}
 
  
 
})

app.post("/api/update/:id", (req,res)=>{
  const PhoneId = req.params.id;
  const PhoneName =req.body.phoneName
  const PhoneBrand = req.body.phoneBrand
  const PhonePrice_1 = req.body.phonePrice_1
  const PhonePrice_2 = req.body.phonePrice_2
  const PhonePrice_3 = req.body.phonePrice_3
  const PhonePrice_4 = req.body.phonePrice_4

try{

  const sqlUpdate=
  "UPDATE phones SET PhonesBrand = ?,PhonesName = ?,PhonePrice_1 = ?,PhonePrice_2 = ?,PhonePrice_3 = ?,PhonePrice_4 = ?  WHERE id = ?;"
   db.query(sqlUpdate,[PhoneBrand,PhoneName,PhonePrice_1,PhonePrice_2,PhonePrice_3,PhonePrice_4,PhoneId])


  console.log("successful update")

}catch(error){
console.log(error)

}
 
  
 
})

app.post("/api/get/insert", (req,res)=>{

    const Vorname=req.body.vorname
    const Nachname=req.body.nachname
    const Mailadress=req.body.mailadress
    const Telefon=req.body.telefon
    const Strasse=req.body.strasse
    const Haousenumber=req.body.housenumber
    const Stadt=req.body.stadt
    const PostCode=req.body.postCode
    const Payment=req.body.payment
    const Info=req.body.info
    const SelectedPhoneName = req.body.phoneName
    const PhonePrice = req.body.PhonePrice


try{

    const sqlInsert=
    "INSERT INTO phone_form (vorName,nachName,mailAdress,telefon,strasse,houseNumber,stadt,postCode,payment,info,phoneName,phonePrice) Values (?,?,?,?,?,?,?,?,?,?,?,?);"
     db.query(sqlInsert,[Vorname,Nachname,Mailadress,Telefon,Strasse,Haousenumber,Stadt,PostCode,Payment,Info,SelectedPhoneName,PhonePrice],(err)=>{
      if (err) {
        return res.send({ err: err });
       }
       console.log("successful insert")
 
  });
  

   

}catch(error){

}
   
    
   
})


app.get("/api/get/:brand",(req,res)=>{
    const brand = req.params.brand;
 
  

    const sqlSelect= "SELECT * FROM phones WHERE PhonesBrand LIKE ?;"

    db.query(sqlSelect,[brand +'%'],(err,result)=>{

        res.send(result);  
   
    });
});
app.get("/api/get",(req,res)=>{

  const sqlSelect= "SELECT * FROM phones;"

  db.query(sqlSelect,(err,result)=>{
    
    res.send(result);  
 
  });

});

app.get("/api/form",(req,res)=>{

  const sqlSelect= "SELECT * FROM phone_form;"

  db.query(sqlSelect,(err,result)=>{

      res.send(result);  
 
 
  });
});

app.get("/api/detail/:phoneId",(req,res)=>{
    const phoneId = req.params.phoneId;
 
  

    const sqlSelect= "SELECT * FROM phones WHERE id = ?;"

    db.query(sqlSelect,[phoneId],(err,result)=>{

      return  res.send(result);  
   
    });
});



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 30*24*3600000,
    },
  })
);



app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/logincheck", (req, res) => {
  if (req.session.user) {
   return res.send({ loggedIn: true, user: req.session.user });
  } else {
   return res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
       return res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
         
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.use(express.static('public')); 
app.use('/phoneImg', express.static('images'));

app.listen(3001);