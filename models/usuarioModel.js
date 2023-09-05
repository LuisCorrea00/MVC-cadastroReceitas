const Database = require("./databaseModel");
const md5 = require("md5");

class Usuario {
    constructor(nome) {
        this.id = id;
        this.nome = nome;
        this.senha = nome;
    }

    static autenticar(nome, senha, callback) {
        Database.query(
            `SELECT * FROM usuario WHERE nome = '${nome}' AND senha = '${md5(
                senha
            )}';`,
            (response) => {
                const data = JSON.parse(JSON.stringify(response));

                if (!data.length) return callback({});
                return callback(data[0]);
            }
        );
    }

    static cadastrar(email, nome, senha) {
        Database.query(
            `INSERT INTO usuario (email, nome, senha) VALUES ('${email}', '${nome}', '${md5(
                senha
            )}');`
        );
    }
}

module.exports = Usuario;