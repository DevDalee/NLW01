const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))


//ultilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação

//página inicial
//req: Requsição
//res: Resposta


server.get("/", (req,res)=>{
    return res.render("index.html", { title: "" })
})


server.get("/create-point", (req,res) =>{

    //req.query: Query Stings da nossa url
    console.log(req.query)

    return res.render("create-point.html")
})


server.get("/search", (req, res) =>{

    //pegar os dados do banco de dados//    
    db.all(`SELECT * FROM places`, function(err, rows){
       if(err) {
           return console.log(err)
      }
      const total = rows.length 
      //Mostrar a página html com os dados do banco de dados
      return res.render("search-results.html", { places: rows, total })
     })

})

//ligar o servidor
server.listen(3000)