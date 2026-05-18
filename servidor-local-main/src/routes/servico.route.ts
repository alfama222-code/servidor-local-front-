import { Router } from "express";
import { ServicoController } from "../controllers/servico.controler.js";
import { authorize } from "../security/auth.middleware.js";
import authMidialwere from "../security/auth.middleware.js";



const ServicoRouter = {
    create: "/create",
    getAll: "/",
    delete: "/delete",
    update: "/update",
    get: "/get",
    getAllDetailed: "/all-detailed"
}
const router = Router()

router.get(ServicoRouter.getAll, authorize(([" Role,admin, Role,cliente, Role,prestador, Role,empresa"])), ServicoController.getAll)

router.get(ServicoRouter.get, authorize(([" Role,admin"])), ServicoController.get)

router.get(ServicoRouter.getAllDetailed, authorize(([" Role,admin Role,cliente, Role,prestador, Role,empresa"])), ServicoController.getAllServicoDetalhada)

router.use(authMidialwere)

router.post(ServicoRouter.create, authorize(([" Role,admin"])), ServicoController.create)

router.delete(ServicoRouter.delete,authorize(([" Role,admin Role,cliente, Role,prestador, Role,empresa"])), ServicoController.delete)

router.put(ServicoRouter.update, authorize(([" Role,admin"])), ServicoController.update)

export { router };