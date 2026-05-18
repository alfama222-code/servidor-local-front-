import type { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: string
      };
    }
  }
}


export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: "utilizador nao autenticado" })
  }
  const token = authHeader.split(" ")[1]

  try {
    const decodedToken = Jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string, email: string, role: string }

    req.user = {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role
    }

    next()

  } catch (error) {
    return res.status(401).json({ message: "token invalido" })
  }
}



//BAC -role based access control
export function authorize(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "utilizador nao autenticado" })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "permissao insuficiente" })
    }
    next()
  }
}


export function isOwner(model: any, field: string) {
  return async (req: Request, res: Response, next: NextFunction) => {

    const userid = req.user?.id

    const { id } = req.params

    const entity = await model.get(id as string)

    if (!entity) return res.status(404).json({ message: "entidade nao encontrada"})

    if (!userid) return res.status(401).json({ message: "utilizador  nao encontrada"})

    if (entity[field] !== userid) return res.status(403).json({ message: "permicao insuficiente" })

  next()

  }
}
  