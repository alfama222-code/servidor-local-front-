import { STATUS_CODES } from "node:http"
import type { usuarioType } from "../utils/types.js"
import db from "../lib/db.js";
import type { Request, Response } from "express";
import { getUsers } from "../users.js";
import { usersmodels } from "../models/users.models.js";
import { comparePassword } from "../utils/password.js";
import Jwt from "jsonwebtoken";
import { id } from "date-fns/locale";



export const UsersControlers = {
    async creatUsers(req: Request, res: Response) {
        const user: usuarioType = req.body

        if (!user) {
            return ({
                status: 'error',
                mensagem: "dados de utilizador invalidos",
                data: null,
            });
        }
        if (!user.nome) {
            return ({
                status: 'error',
                menssagem: "nome obrigatorio",
                data: null,
            });
        }
        const criarUsersResponse = await usersmodels.iserirUsers(user)
        if (criarUsersResponse === null)
            return res.status(400).json({
                status: "error",
                mensagem: "dados de utilizador invalidos",
                data: null
            })
        return res.status(200).json({
            status: "200",
            mensagem: "dados de utilizador validos",
            data: null,
        })

    },


    async apanharUsers(req: Request, res: Response) {

        const apanharUsersResponse = await usersmodels.apanharServico()
        console.log("iygyo", apanharUsersResponse)
        if (apanharUsersResponse === null)
            return res.status(400).json({
                status: "error",
                massage: "dados de utilizador invalidos",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "dados de utilizador validos",
            data: apanharUsersResponse,
        })

    },


    async deleteUsers(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const deleteUsersResponse = await usersmodels.delete(id as string)
        if (!deleteUsersResponse)
            return res.status(404).json({
                status: "error",
                mensagem: "Utilizador nao encontrado",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "Utilizador deletado com sucesso",
            data: deleteUsersResponse
        })

    },


    async updateUsers(req: Request, res: Response) {
        const id = req.params
        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "dados de utilizador invalidos",
                data: null
            })
        }
        const updateUsersResponse = await usersmodels.updateServico
        if (!updateUsersResponse)
            return res.status(404).json({
                status: "error",
                mensagem: "Utilizador nao encontrado",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "Utilizador atualizado com sucesso",
            data: updateUsersResponse
        })
    },

    async getUsersById(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }
        const getusersResponse = await usersmodels.get(id as string)

        if (!getusersResponse) {
            return res.status(404).json({
                status: "erro",
                message: "Utilizador nao encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "Utilizador encontrado com sucesso",
            data: getusersResponse
        })
    },


    async login(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "cridenciais invalidas",
                data: null
            })
        }
        const usersdata = await usersmodels.getByEmail(email as string)

        if (!usersdata) {
            return res.status(404).json({
                status: "error",
                message: "nao existe nenhuma conta com este email.",
                data: null
            })
        }
        const isPasswordValid = await comparePassword(password, usersdata.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "cridenciais invalidas",
                data: null
            })
        }
        const playload = {
            id: usersdata.id,
            email: usersdata.email,
            nome: usersdata.nome,
            role: usersdata.role
        }

        const token = Jwt.sign(playload, process.env.JWT_SECRET as string, { expiresIn: "1h" })
        return res.status(200).json({
            status: "success",
            message: "login realizado com sucesso",
            data: {
                token,
                user: playload
            }
        })
    },
    // controler para atualizar password
     async updatePassword(req: Request, res: Response) {
      try {
            const userId = req.params.id;
            // const hash = hashpassword(userId as string);
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                return res.status(400).json({
                    message: "dados de servicos invalidos"
                });
            }
            //verificar se o user existe
            const user = await usersmodels.get(userId as any);

            if (!user) {
                return res.status(404).json({
                    message: "Utilizador nao encontrado"
                });
            }
            //verificar se a senha antiga esta correta
            const isMatch = await comparePassword;

            if (!isMatch) {
                return res.status(401).json({
                    message: "A senha antiga está incorreta"
                });
            }
            //atualizar a senha
            const updateResponse = await usersmodels.updateServico(userId as string, newPassword);

            if (!updateResponse) {
                return res.status(400).json({
                    message: "Erro ao atualizar a senha"
                });
            }
            //retornar a resposta
            return res.status(200).json({
                message: "Senha atualizada com sucesso"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor"
            });
        }
    },
//controler para resetar a password
    async resetPassword(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const { newPassword } = req.body;

            if (!newPassword) {
                return res.status(400).json({
                    message: "nova password invalida"
                });
            }
            const user = await usersmodels.get(userId as any);

            if (!user) {
                return res.status(404).json({
                    message: "Utilizador nao encontrado"
                });
            }
            //resetar a senha
            const updateResponse = await usersmodels.resetPassword(userId as string, newPassword);

            if (!updateResponse) {
                return res.status(400).json({
                    message: "Erro ao resetar a password"
                });
            }
            //retornar a resposta
            return res.status(200).json({
                message: "password resetada com sucesso"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor"
            });
        }
    },
}