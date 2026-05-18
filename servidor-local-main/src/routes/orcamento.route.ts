import { Router } from "express"
import { orcamentocontrolers } from "../controllers/orcamento.controlers.js"
import authMiddleware, { authorize } from "../security/auth.middleware.js"

const OrcamentoRouter = {
    create:"/create",
    getAll:"/",
    delete:"/delete",
    update:"/update",
    get:"/get"
}
const router = Router()
router.use(authMiddleware)

router.post(OrcamentoRouter.create,authorize(["Role,ADMIN"]), orcamentocontrolers.create) 

router.get(OrcamentoRouter.getAll, authorize(["Role,ADMIN"]),orcamentocontrolers.apanharOrcamento) 

router.delete(OrcamentoRouter.delete,authorize(["Role,ADMIN"]), orcamentocontrolers.deleteOrcamento)   

router.put(OrcamentoRouter.update,authorize(["Role,ADMIN"]), orcamentocontrolers.updateOrcamento) 

router.get(OrcamentoRouter.get, authorize(["Role,ADMIN"]),orcamentocontrolers.getOrcamento) 
 
export {router};