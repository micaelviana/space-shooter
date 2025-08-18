import express from "express";
import { engine } from "express-handlebars";
import router from './router/router'
import validateEnv from './utils/validateEnv';
import dotenv from "dotenv";
import { logger } from './middleware/logger';
//quando eu tentei importar usando {cookieParser} deu erro, investigar
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from 'uuid'
import session from 'express-session'
//TODO: ainda nao funciona em producao
import * as helpers from './views/helpers';
import path from 'path'

//arquivos que terminam com d.ts sao procurados pelo typescript para serem encorporados
//reabrir uma interface do modulo para coolocar uma propriedade
declare module "express-session" {
  interface SessionData {
    logado: boolean
    name_session: string
    id_session: string
    score_session: number
  }
}

dotenv.config();
validateEnv() //valida e inicia um pouco mais
const PORT = process.env.PORT || 3333;

const app = express();

// Configurando o middleware de log
app.use(logger('completo')); // ou 'simples' se preferir

//do jogo
//app.use(express.static(path.join(process.cwd(), 'public/game')));

const publicPath = `${process.cwd()}/public`
app.use('/css', express.static(`${publicPath}/css`))
app.use('/js', express.static(`${publicPath}/js`))
app.use('/img', express.static(`${publicPath}/img`))
app.use('/assets', express.static(`${publicPath}/assets`))

//middleware para extrair os dados de request.body
app.use(express.urlencoded({ extended: false }))

//geralmente a gente coloca cookies antes do router
app.use(cookieParser())

//SESSAO
app.use(session({
  //se a gente nao colocar uma funcao dessa o proprio session vai dar um jeito de gerar uma funcao aleatoria
  genid: () => uuidv4(),
  //eh uma forma de valida o uuid que o usuario esta mandando para o servidor
  secret: process.env.SECRET_SESSION!, //uma variavel importada do .env pode ser string ou undefined, a exclamacao afirma para o Typescript que esse cara existe
  //renovar a sessao, vamos supor que a sessao esteja programada para encerrar apos duas horas
  //com isso ele vai encerrar duas horas depois do ultimo acesso, tipo o Colab
  resave: true, //poderia colocar false aqui se tivesse utilizando o session do proprio express ou o redis tambem
  cookie: { maxAge: 6 * 60 * 60 * 1000 }, //seis horas sem o usuario acessar o servidor a sessao dele vai ser automaticamente reinicializada
  //a sessao vai ser salva mesmo que seja o prmeiro acesso
  saveUninitialized: true
}))

//Fazer a sessao funcionar toda hora
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(router)

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`);
});


//HANDLEBARS
app.engine('handlebars', engine({
  //um dia eu vou fazer isso funcionar em producao, eu acho que se eu importar o helpers como um objeto, ele vai funcionar
  //quem precisa disso eh so o hb4 pelo visto
  helpers,
  layoutsDir: `${__dirname}/views/layouts`,
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`)
