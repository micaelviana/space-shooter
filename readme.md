# Projeto final

## Configuração
`npm install`

`docker run -d \
--name mysql-game-app \
--network game-app-network \
-p 3307:3306 \
-e MYSQL_ROOT_PASSWORD=senhasegura \
-e MYSQL_DATABASE=game \
-v mysql-game:/var/lib/mysql \
mysql:latest`

`docker run -d \
--name phpmyadmin \
--network game-app-network \
-e PMA_HOST=mysql-game-app \
-e PMA_PORT=3306 \
-e PMA_USER=root \
-e PMA_PASSWORD=senhasegura \
-p 8081:80 \
phpmyadmin/phpmyadmin`

`npx prisma migrate dev --name`

## Comandos para acessar a página

```bash
docker start mysql-game-app phpmyadmin 
npm run sass
npm start
```
