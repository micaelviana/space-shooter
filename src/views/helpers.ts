//TODO: mover esse cara para dentro da views/
import { Prof, Technology } from '../types/hbs-types';

export const eq = (a: any, b: any): boolean => a === b;

export function listProfs(profs: Prof[]) {
  const list = profs.map((p) => `<li>${p.nome}-${p.sala}</li>`)
  return `<ul>${list.join('')}</ul>`
}

export function listTech(techs: Technology[]) {
  const filteredTechs = techs.filter(tech => tech.poweredByNodejs === true);
  const list = filteredTechs.map(tech => `<li>${tech.name} - ${tech.type}</li>`);
  return `<ul>${list.join('')}</ul>`;
}

export const inc = (value: number): number => {
  return value + 1;
};
