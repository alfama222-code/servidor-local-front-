import { Router } from "express"
import { prestacaoControler} from "../controllers/prestacaoservico.controlers.js"
import type { get } from "node:http"
import { authorize } from "../security/auth.middleware.js"
import authMidialwere from "../security/auth.middleware.js"


const PrestacaoServicoRouter = {
    create:"/create",
    getAll:"/",
    delete:"/delete",
    update:"/update",
    get:"/get",
    listAll:"/getAll"
}
const router = Router()

router.get(PrestacaoServicoRouter.getAll,authorize(["Role,ADMIN,Role,Role,PRESTADOR"]), prestacaoControler.getPrestacaoServicoById)

router.get(PrestacaoServicoRouter.getAll,authorize(["Role,ADMIN,Role,CLIENTE,Role,PRESTADOR,Role,EMPRESA"]), prestacaoControler.getAllPrestacoesServicoDetalhada)

router.get(PrestacaoServicoRouter.get,authorize(["Role,ADMIN,Role,CLIENTE,Role,PRESTADOR,Role,EMPRESA"]), prestacaoControler.getAllPrestacoesServico)

router.use(authMidialwere)

router.post(PrestacaoServicoRouter.create,authorize(["Role,ADMIN,Role,CLIENTE,Role,EMPRESA "]), prestacaoControler.createPrestacaoServico)

router.delete(PrestacaoServicoRouter.delete, authorize(["Role,ADMIN,Role,PRESTADOR,Role,EMPRESA"]),prestacaoControler.deletePrestacaoServico)  
  
router.put(PrestacaoServicoRouter.update,   authorize(["Role,ADMIN,Role,PRESTADOR,Role,EMPRESA"]),prestacaoControler .updatePrestacaoServico) 

export {router};