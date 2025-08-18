import { Request, Response } from "express";
import { getUsers, getUser, createUser, removeUser, updateUser, checkAuth, getUserByEmail, getGameSession, updateScoreUser, saveScoreUser } from "../services/user";
import { getMajor, getMajors } from "../services/major";
import { loginDTO, createUserDTO } from "../types/user";

const index = async (req: Request, res: Response) => {
  try {
    const users = await getUsers()
    res.render('user/index', { users, mensagem: 'Bem vindo ao sistema de gerenciamento de usuários' })
  } catch (error) {
    console.error("Erro ao buscar usuários", error);
    res.status(500).send(error)
  }
}

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const majors = await getMajors()
    res.render('user/create', { majors })
  }
  else if (req.method === 'POST') {
    try {
      const user = req.body
      console.log(user)
      await createUser(user)
      res.redirect('/users/')
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}

const read = async (req: Request, res: Response) => {
  const { id } = req.params //eu to indicando que req.params eh um objeto e o que eu quero pegar eh o id 
  try {
    const user = await getUser(id)
    res.render('user/read', {
      user,
    });
  } catch (error) {
    console.log(error)
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.method === "GET") {
    try {
      const user = await getUser(id);
      const majors = await getMajors();
      if (user) {
        res.render("user/update", { user, majors });
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else if (req.method === "POST") {
    try {
      const user = req.body;
      await updateUser(id, user);
      res.redirect("/users");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await removeUser(id)
    res.redirect('/users')
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

const login = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render("user/login")
  } else {
    const { email, password } = req.body as loginDTO
    const ok = await checkAuth(email, password)
    if (!ok) {
      res.render("user/login", {
        ok,
      })
    } else {
      req.session.logado = true
      const user = await getUserByEmail(email)
      //TODO: eu nao entendi essa linha direito
      req.session.name_session = user ? user.name : ""
      req.session.id_session = user ? (user.id) : ""
      req.session.score_session = 0 //vai comecar valendo nada porque ele acabou de logar e ainda nao jogou
      res.redirect("/")
      console.log("Estou logado")
    }
  }
}

const logout = (req: Request, res: Response) => {
  req.session.logado = false
  req.session.destroy(() => {
    res.clearCookie("connect.sid")
    //tem que fazer desse jeito com | senao ele nao deixa por medidas de seguranca
    res.redirect("/users/login")
  })
}


const saveScore = async (req: Request, res: Response) => {
  const { score } = req.params;
  const id = req.session.id_session ?? 0

  // salvar na tabela game_sessions
  try {
    const actualGameSession = await getGameSession(id.toString());
    let gameSession;
    if (actualGameSession && parseInt(score) > actualGameSession.score)
      gameSession = await updateScoreUser(parseInt(score), id.toString());
    else if (!actualGameSession)
      gameSession = await saveScoreUser(parseInt(score), id.toString());

    console.log(gameSession);
    console.log('Pontuação salva com sucesso!');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar a pontuação!' });
    console.log(error);
  }
};

export default { index, create, remove, read, update, login, logout, saveScore }
