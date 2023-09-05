const Database = require("./databaseModel");

class Receita {
    constructor(titulo, ingredientes, modoPreparo, foto) {
        this.titulo = titulo;
        this.ingredientes = ingredientes;
        this.modoPreparo = modoPreparo;
        this.foto = foto;
    }
    static verReceitas(req, callback){
        Database.query(
            `SELECT * FROM receita WHERE id_usuario = ${req.session.user.id_usuario};`,
            (response) => {
                const data = JSON.parse(JSON.stringify(response));
                return callback(data);
            }
        );
    }
    static verReceita(id, req, callback){
        Database.query(
            `SELECT * FROM receita WHERE id_receita = ${id} AND id_usuario = ${req.session.user.id_usuario};`,
            (response) =>{
                const data = JSON.parse(JSON.stringify(response));
                return callback(data);
            }
        );
    };
    static add(receita, req){
        Database.query(        
            `INSERT INTO receita (titulo, ingredientes, modoPreparo, foto, id_usuario) VALUES ('${receita.titulo}', '${receita.ingredientes}', '${receita.modoPreparo}', '${receita.foto}', ${req.session.user.id_usuario});`
        );
    };
    static delete(id){
        Database.query(
            `DELETE FROM receita WHERE id_receita = ${id};`
        );
    };
    static edit(receita, id){
        Database.query(
            `UPDATE receita SET titulo = '${receita.titulo}', ingredientes = '${receita.ingredientes}', modoPreparo = '${receita.modoPreparo}' WHERE id_receita = ${id};`
        );
    };
}

module.exports = Receita;;