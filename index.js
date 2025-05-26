const express = require('express')
const mysql = require("mysql2")



const app = express()



app.use(express.json())

const conexao = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database:"sessoes",
})

const sessoes = []

app.post('/sessoes', (req, res) => {
    const sessoes = {
        aluno: req.body.aluno,
        personal: req.body.personal,
        tipo_treino: req.boddy.treino,
        data: req.body.data,
        horario: req.body.horario,
        observacoes: req.boy.observacoes

    }

    if (!sessoes.aluno || typeof sessoes.aluno!= 'string' || sessoes.aluno.trim() == '') {
        return res.status(400).send('Nome do aluno é obrigatório e deve ser uma string não vazia.');
    }
    
    if (!sessoes.personal || typeof sessoes.personal!= 'string' || sessoes.personal.trim() == '') {
        return res.status(400).send('Nome do personal é obrigatório e deve ser uma string não vazia.');
    }

    if (!sessoes.tipo_treino || typeof sessoes.tipo_treino!= 'string' || sessoes.tipo_treino.trim() == '') {
        return res.status(400).send('O treino é obrigatório e deve ser uma string não vazia.');
    }

    if (sessoes.data == undefined || typeof sessoes.data != 'number' || sessoes.data <= 0) {
        return res.status(400).send('Data deve ser um número positivo.');
    }

    if (sessoes.horario == undefined || typeof sessoes.horario != 'number' || sessoes.horario <= 0) {
        return res.status(400).send('Horario deve ser um número positivo.');
    }
 

    conexao.query(
        "INSERT INTO sessoes (aluno, personal, tipo_treino, data, horario, observacoes) VALUES (?,?,?,?,?,?)",
        [sessoes.aluno, sessoes.data, sessoes.horario, sessoes.observacoes ,sessoes.personal, sessoes.tipo_treino],
        ()=> {
            res.status(201).send("Sessao cadastrada com sucesso!")
        }
    )

})


app.get('/sessoes', (req, res) => {
    const query = 'SELECT * FROM sessoes';
    conexao.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ erro: err });
        return;
      }
      res.json(results);
    });
  });
    
app.listen(3000, () => {
        console.log("Sistema de Agendamento rodando em http://localhost:3000")
    }) 
    







