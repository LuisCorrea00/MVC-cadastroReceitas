const Receita = require("../models/receitaModel.js");

function getReceitas(req, res) {
    Receita.verReceitas(req, (data) => {
        return res.render("receitasView", { receitas: data });
    });
}

function getReceita(req, res) {
    const { id } = req.params;

    Receita.verReceita(id,req,(data)=>{
        if(data.length){
            return res.render("receitaView", { receita: data[0] });
        }
        return res.redirect("/receitas");
    });
}

function editReceita(req, res) {
    const { id } = req.params;

    Receita.verReceita(id,req,(data)=>{
        if(data.length){
            return res.render("editView", { receita: data[0] });
        }
        return res.redirect("/receitas");
    });
}

function postReceita(req, res) {
    const { titulo, ingredientes, modoPreparo } = req.body;
    const foto = req.file.originalname;
    const receita = new Receita(titulo, ingredientes, modoPreparo,foto);

    Receita.add(receita,req);
    res.redirect("/receitas");
}

async function deleteReceita(req, res) {
    const { id } = req.body;

    Receita.delete(id);
    res.redirect("/receitas");
}

async function updateReceita(req, res) {
    const { id, titulo, ingredientes, modoPreparo } = req.body;
    const receita = new Receita(titulo, ingredientes, modoPreparo);

    Receita.edit(receita, id);
    res.redirect("/receitas");
}

module.exports = {
    getReceitas,
    getReceita,
    editReceita,
    postReceita,
    deleteReceita,
    updateReceita,
};