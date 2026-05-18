// No topo do owner.test.ts
import { jest, describe, it, beforeEach, expect } from "@jest/globals"
import { isOwner } from '../security/auth.middleware.js';



describe("Unit test : isOwner Middlerware", () => {
    let mockRequest: any
    let mockResponse: any
    let mockNext: any = jest.fn()
    //formacao response
    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    })

    it("deve retornar 403 se o usuario nao for o dono do recurso", async () => {
        //1.Simulacao de usuario logado 
        mockRequest = {
            user: { id: "user_123" },
            params: { id: "servico_999" }
        }

        //2.simulacao de model (id do dono na BD é "outro_user"
        const mockModel = {
            get: jest.fn<any>().mockResolvedValue({ id_utilizador: 'outro_user' })
        }
        const middlerware = isOwner(mockModel, "id_utilizador")
        await middlerware(mockRequest, mockResponse, mockNext)

        expect(mockResponse.status).toHaveBeenCalledWith(403)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "permicao insuficiente"
        })
        expect(mockNext).not.toHaveBeenCalled()
    });
})


