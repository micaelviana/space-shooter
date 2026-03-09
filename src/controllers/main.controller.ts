import { Request, Response, Router } from 'express';
import { LoremIpsum } from "lorem-ipsum";
import { getUser, getUsers, getRanking } from '../services/user';

const index = async (req: Request, res: Response) => {
  const users = await getUsers()
  res.render('main/index', {
  });
};

const about = (req: Request, res: Response) => {
  res.render('main/about', {
    mensagem: 'Jogo Space Shooter',
  })
}

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', {
    mensagem: 'Universidade Federal do Amazonas',
  })
}

const hb2 = (req: Request, res: Response) => {
  res.render('main/hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  });
}

const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 }
  ];
  res.render('main/hb3', { profes });
}

const hb4 = function(req: Request, res: Response) {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];
  res.render('main/hb4', { technologies });
}

const lorem = (req: Request, res: Response) => {
  const qt = req.params.qt

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });//fim da instancia da classe lorem

  const paragraphs = lorem.generateParagraphs(parseInt(qt));
  // Formata os parágrafos como elementos HTML <p> para exibição no navegador
  const htmlParagraphs = paragraphs.split('\n').map(p => `<p>${p}</p>`).join('');
  res.send(htmlParagraphs)
}

const testeCookie = (req: Request, res: Response) => {
  if (!('teste-cookie' in req.cookies)) {
    res.cookie('teste-cookie', 'algum valor')
    res.send('Vc nunca passou por aqui')
  } else {
    res.send('Vc ja passou por aqui')
  }
}

const ranking = async (req: Request, res: Response) => {
  const rankingData = await getRanking();
  res.render('main/ranking', { ranking: rankingData });
}; 

export default { index, hb1, hb2, hb3, hb4, lorem, about, testeCookie, ranking };
