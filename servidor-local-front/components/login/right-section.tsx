"use client";
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardHeader, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react";
import { toast } from "sonner";
import { setCookie } from "nookies";



//components/login/right-section.tsx
export const RightSection = () => {
    //handle state for inputs 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //change email handle state
    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setEmail(e.target.value);
        } else {
            setEmail(e.target.value);
        }
    };

    //change password handle state
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setPassword(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    //handle submit function
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //fetch API
        const response = await fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })

        if (response.status === 200) {
            toast.success("Login realizado com sucesso!");

            const responseData = await response.json();

            //Salvar dados no cookies
            setCookie(null, "token",
                responseData.token,
                {
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                });

            setCookie(null, "user",
                JSON.stringify(responseData.user),
                {
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                });

            //Redirecionamento para a pagina home
            if (typeof window !== "undefined") {
                window.location.href = "/home";
            }
        } else {
            toast.error("Email ou senha invalidos!");
        }
    };

    return (
        <div className="w-1/2">
            <Card className="h-full flex flex-col  justify-center px-14 gap-16">
                <CardHeader>
                    <span className="text-3xl font-bold">Login</span>
                </CardHeader>
                <CardContent>
                    {/*handle state for inputs */}
                    <div className="flex flex-col gap-5">
                        {/*handle state for email input */}
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input type="text "
                                className=" py-2 h-10 text-lg"
                                placeholder="make your email... "
                                value={email}
                                onChange={changeEmail}
                            />
                        </div>

                        {/*handle state for password input */}
                        <div className="flex flex-col gap-2">
                            <Label>Password</Label>
                            <Input type="password"
                                className=" py-2 h-10 text-lg"
                                placeholder="make your password..."
                                value={password}
                                onChange={changePassword}
                            />
                        </div>
                        <Button
                            onClick={handleLogin}
                            className="bg-[#13a4ec] text-white w-full font-bold py-3 drop-shadow-lg " >
                            Login
                        </Button>
                    </div>

                    <div className="flex justify-center">
                        <span>Don't have account yet ?</span>
                        <Link href="/register" className="text-[#13a4ec] font-semibold" >Create acount now</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 