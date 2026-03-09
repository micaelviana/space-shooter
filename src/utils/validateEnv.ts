import { cleanEnv, port, str } from 'envalid';
const validateEnv = () => {
  cleanEnv(process.env, {
    //alem de verificar se eh uma string ele vai verificar se eh uma dessas duas
    NODE_ENV: str({ choices: ['production', 'development'] }),
    PORT: port(),
    LOGS_PATH: str(),
    SECRET_SESSION: str(),
  });
};
export default validateEnv;
