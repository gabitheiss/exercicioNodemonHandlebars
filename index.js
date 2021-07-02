const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const Post = require("./Post");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('images'))

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.get("/cad", (req, res) => {
  res.render("formulario");
});
app.get("/", (req, res) => {
  Post.findAll().then((posts) => {
    res.render("home", { posts: posts });
  });
});
app.post("/add", (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      res.send("falha ao cadastrar o pos" + erro);
    });
});
app.get("/deletar/:id", (req, res) => {
  Post.destroy({
    where: { id: req.params.id },
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      res.send("Falha" + erro);
    });
});
app.get('/editar/:id',(req,res)=>{
  Post.findAll({where:{'id':req.params.id}}).then((post)=>{
    res.render('edit',{post:post})
  })
})
app.post("/atualizar/:id", (req, res) => {
  Post.update(
    {
      titulo: req.body.titulo,
      conteudo: req.body.conteudo,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      console.log(erro);
    });
});




app.listen(8001, () => {
  console.log("ok!");
});
