const porta = 3003

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bancoDados = require('./bd')

app.use(bodyParser.urlencoded({extended: true})) //Converter a requisição em objeto

//Mostrar todos os produtos
app.get('/produtos', (req, res, next) => {
    res.send(bancoDados.getProdutos())
})

//Mostrar produto especifico pelo ID
app.get('/produtos/:id', (req,res,next) => {
    res.send(bancoDados.getProduto(req.params.id))
})


//Criar produto
app.post('/produtos', (req, res, next) => {
    const produto = bancoDados.salvarProdutos( {
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) // envia como JSON
})

//Editar produto
app.put('/produtos/:id', (req, res, next) => {
    const produto = bancoDados.salvarProdutos( {
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) // envia como JSON
})

//Deletar produto
app.delete('produtos/:id', (req, res, next) => {
    const produto = bancoDados.excluirProduto(req.params.id)
    res.send(produto)
})

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})