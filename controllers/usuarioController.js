const Usuario = require("../models/usuarioModel.js");

function autenticarUsuario(req, res) {
    const { nome, senha } = req.body;

    if (!nome || !senha) return res.sendStatus(404);

    Usuario.autenticar(nome, senha, (data) => {
        console.log(data);
        if (data?.id_usuario) req.session.user = data;

        return res.redirect("/receitas");
    });
}

function cadastrarUsuario(req, res) {
    console.log(req.body);
    const { email, nome, senha } = req.body;

    if (!nome || !senha || !email) return res.sendStatus(404);

    Usuario.cadastrar(email, nome, senha);

    res.redirect("/receitas");
}

module.exports = {
    autenticarUsuario,
    cadastrarUsuario,
};