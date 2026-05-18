import { Router } from "express"
import { prestadorecontrollers } from "../controllers/prestador.controlers.js"
import authMiddleware, { authorize } from "../security/auth.middleware.js";

const PrestadorRouter = {
    create:"/create",
    getAll:"/",
    delete:"/delete",
    update:"/update",
    get:"/get"
}
const router = Router()

router.get(PrestadorRouter.get,authorize(["Role,ADMIN,Role,CLIENTE,Role,PRESTADOR,Role,EMPRESA"]), prestadorecontrollers.getPrestador) 

router.get(PrestadorRouter.getAll,authorize(["Role,ADMIN,Role,CLIENTE,Role,PRESTADOR,Role,EMPRESA "]) ,prestadorecontrollers.apanharPrestador)

router.use(authMiddleware)

router.delete(PrestadorRouter.delete,authorize(["Role,ADMIN ,Role,CLIENTE,Role,PRESTADOR"]), prestadorecontrollers.deletePrestador)    

router.post(PrestadorRouter.create ,authorize(["Role,ADMIN ,Role,CLIENTE,Role,PRESTADOR,Role,EMPRESA"]), prestadorecontrollers.create )

router.put(PrestadorRouter.update,authorize(["Role,ADMIN,Role,CLIENTE,Role,PRESTADOR,Role,EMPRESA"]), prestadorecontrollers.updatePrestador)

export {router};