"use client"
import { Card, CardHeader, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"


export const RightRegist = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [numero_identificacao, setNumero_identificacao] = useState("")
    const [data_nascimento, setData_nascimento] = useState("")
    const [telefone, setTelefone] = useState("")
    const [pais, setPais] = useState("")
    const [cidade, setCidade] = useState("")
    const [enabled, setEnabled] = useState("")


    //handle state for inputs 
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setName(e.target.value);
        } else {
            setName("");
        }
    }

    const changeNumero_identificacao = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setNumero_identificacao(e.target.value);
        } else {
            setNumero_identificacao("");
        }
    }

    const changeData_nascimento = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setData_nascimento(e.target.value);
        } else {
            setData_nascimento("");
        }
    }

    const changeTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setTelefone(e.target.value);
        } else {
            setTelefone("");
        }
    }

    const changePais = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setPais(e.target.value);
        } else {
            setPais("");
        }
    }

    const changeCidade = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setCidade(e.target.value);
        } else {
            setCidade("");
        }
    }

    const changeEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setEnabled(e.target.value);
        } else {
            setEnabled("");
        }
    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setEmail(e.target.value);
        } else {
            setEmail("");
        }
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setPassword(e.target.value);
        } else {
            setPassword("");
        }
    }

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //fetch API
        const response = await fetch("http://localhost:8080/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: name,
                numero_identificacao: numero_identificacao,
                data_nascimento: data_nascimento,
                email: email,
                telefone: telefone,
                pais: pais,
                localidade: cidade,
                password: password,
                enabled: true,
                role: "cliente"
            }),
        });

        if (response.status === 200) {
            toast.success("Conta criada com sucesso!");

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        } else {
            toast.error("Erro ao criar conta!");
        }
    };


    return (
        <div className="w-1/2">
            <Card className="h-full flex flex-col justify-center px-14 gap-10">
                <CardHeader>
                    <span className="text-3xl font-bold">Create your Account</span>
                </CardHeader>

                <CardContent>
                    {/*input name */}
                    <div className="flex flex-col">
                        {/*handle state for email input */}
                        <div className="flex flex-col gap-2">
                            <Label>Nome</Label>
                            <Input type="text "
                                className=" py-2 h-10 text-lg"
                                placeholder="name... "
                                value={name}
                                onChange={changeName}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            {/*handle state for Identification number input */}
                            <Label>Numero de Identificação</Label>
                            <Input type="number "
                                className=" py-2 h-10 text-lg"
                                placeholder="identification number... "
                                value={numero_identificacao}
                                onChange={changeNumero_identificacao}
                            />
                        </div>

                        {/*handle state for birthday date input */}
                        <div className="flex flex-col gap-2">
                            <Label>Data de Nascimento</Label>
                            <Input type=""
                                className=" py-2 h-10 text-lg"
                                placeholder="your birthday date... "
                                value={data_nascimento}
                                onChange={changeData_nascimento}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Telefone</Label>
                            <Input type="number "
                                className=" py-2 h-10 text-lg"
                                placeholder="your phone number... "
                                value={telefone}
                                onChange={changeTelefone}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Pais</Label>
                            <Input type="text "
                                className=" py-2 h-10 text-lg"
                                placeholder="your country... "
                                value={pais}
                                onChange={changePais}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Cidade</Label>
                            <Input type="text "
                                className=" py-2 h-10 text-lg"
                                placeholder="your city... "
                                value={cidade}
                                onChange={changeCidade}
                            />
                        </div>
                        {/*handle state for email input */}
                        <div className="flex flex-col gap-2 ">
                            <Label>Email</Label>
                            <Input type="email "
                                className=" py-2 h-10 text-lg"
                                placeholder="your email... "
                                value={email}
                                onChange={changeEmail}
                            />
                        </div>

                        {/*handle state for password input */}
                        <div className="flex flex-col gap-2">
                            <Label>Password</Label>
                            <Input type="password"
                                className=" py-2 h-10 text-lg"
                                placeholder="your password..."
                                value={password}
                                onChange={changePassword}
                            />
                        </div>

                        {/*handle state for email input */}
                        <div className="flex flex-col gap-2">
                            <Label>Enabled</Label>
                            <Input type="date "
                                className=" py-2 h-10 text-lg"
                                placeholder="Enabled... "
                                value={enabled}
                                onChange={changeEnabled}
                            />

                            <Button
                                onClick={handleRegister}
                                className="bg-[#13a4ec] text-white w-full font-bold py-3 drop-shadow-lg " >
                                Register
                            </Button>

                            <div className="flex justify-center">
                                <span>Alred have an account ?</span>
                                <Link href="/login" className="text-[#13a4ec] font-semibold" >Sign in</Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}