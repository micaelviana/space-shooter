import { Request, Response, NextFunction } from "express";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.logado){
    console.log("estou logado")
    next()
  } 
  else {
    res.redirect("/users/login")
    console.log("Nao estou logado")
  }
//res.status(403).send("U shall not pass")
}

export default checkAuth