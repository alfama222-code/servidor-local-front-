import { roundToNearestMinutes } from "date-fns"
import { Router } from "express"
import { propostacontrolers } from "../controllers/proposta.controlers.js"
import { authorize, isOwner } from "../security/auth.middleware.js"
import authMiddleware from "../security/auth.middleware.js"
import { propostamodels } from "../models/proposta.models.js"

const PropostaRouter = {
    create:"/create",
    getAll:"/",
    delete:"/delete",
    update:"/update",
    get:"/get",
    aceitar:"/aceitar"
}
const router = Router()

router.get(PropostaRouter.getAll,authorize(["Role,ADMIN,Role,PRESTADOR,Role,EMPRESA"]), propostacontrolers.apanharProposta)

router.get(PropostaRouter.get, authorize(["Role,ADMIN,Role,PRESTADOR,Role,EMPRESA"]), propostacontrolers.getProposta)

router.use(authMiddleware)

router.post(PropostaRouter.create,authorize(["Role,ADMIN,Role,PRESTADOR,Role,EMPRESA"]), propostacontrolers.create)

router.put(PropostaRouter.update,authorize(["Role,ADMIN,Role,EMPRESA,Role,PRESTADOR"]) , isOwner(propostamodels, "owner"),propostacontrolers.updateProposta)

router.delete(PropostaRouter.delete, authorize(["Role,ADMIN,Role,EMPRESA,Role,PRESTADOR"]), isOwner(propostamodels, "owner"), propostacontrolers.deleteProposta)     

router.put(PropostaRouter.aceitar,  authorize(["Role,ADMIN,Role,PRESTADOR,Role,EMPRESA"]), propostacontrolers.aceitarProposta)

export {router};