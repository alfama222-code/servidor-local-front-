import { Router } from "express";
import { UsersControlers } from "../controllers/users.controler.js";
import authMidialwere, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";





const UsersRouter = {
     login:"/login",
    create:"/create",
    getAll:"/",
    delete:"/delete",
    update:"/update",
    get:"/get",
    resetPassword:"/resetPassword"
}
const router = Router();
router.post(UsersRouter.login, UsersControlers.login)

router.post(UsersRouter.create, UsersControlers.creatUsers)

router.use(authMidialwere)

router.get(UsersRouter.getAll,authorize(["Role,ADMIN",]) ,UsersControlers.apanharUsers)

router.delete(UsersRouter.delete,authorize(["Role,ADMIN"]), UsersControlers.deleteUsers)    

router.put(UsersRouter.update, authorize(["Role,ADMIN,Role,CLIENTE,Role,PRESTADOR,Role,EMPRESA"]), UsersControlers.updateUsers)

router.get(UsersRouter.get, authorize(["Role,ADMIN,Role,CLIENTE.Role,PRESTADOR,Role,EMPRESA"]), UsersControlers.getUsersById)   

router.put(UsersRouter.resetPassword,authorize(["Role,ADMIN ,Role,CLIENTE,Role,PRESTADOR,Role,EMPRESA"]), UsersControlers.updatePassword)




export {router }
