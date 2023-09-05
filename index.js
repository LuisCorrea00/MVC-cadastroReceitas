require("dotenv").config();

const path = require("path");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const multer = require('multer');

const PORT = 3000;
const app = express();

const receitaController = require("./controllers/receitaController");
const usuarioController = require("./controllers/usuarioController");

function verificarUsuario(req, res, next) {
    if (req.originalUrl === "/login" || req.originalUrl === "/cadastro") {
        app.set("layout", "./layouts/login");

        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            title: "Autenticação",
        };

        next();
    } else if (req?.session?.user) {
        app.set("layout", "./layouts/index");

        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            title: "Lista de Receitas",
            user: req.session.user,
        };
        next();
    } else res.redirect("/login");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    }
});

const upload = multer({ storage: storage });

app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: false,
    })
);
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(verificarUsuario);

// ROTAS
app.get("/", receitaController.getReceitas);
app.get("/login", (_req, res) => res.render("loginView"));
app.get("/cadastro", (_req, res) => res.render("cadastroView"));
app.post("/login", usuarioController.autenticarUsuario);
app.post("/cadastro", usuarioController.cadastrarUsuario);
app.get("/receitas", receitaController.getReceitas);
app.get("/receita/:id", receitaController.getReceita);
app.get("/receita/editar/:id", receitaController.editReceita);
app.post("/receita", upload.single('filetoupload'), receitaController.postReceita);
app.post("/receita/update", receitaController.updateReceita);
app.post("/receita/delete", receitaController.deleteReceita);

app.listen(PORT, () => console.log("Rodando na porta: " + PORT));