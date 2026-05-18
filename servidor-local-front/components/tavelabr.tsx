"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";



export const Tavela = () => {
    const [prestacaoServico, setPrestacaoServico] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/prestacao_servico/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        if (response.status === 200) {
            toast.success(
                "Prestação de serviços buscada com sucesso!"
            );
            const data = await response.json();
            console.log(data);
            setPrestacaoServico(data.data);

        } else {
            toast.error(
                "Erro ao buscar prestação de serviços!"
            );
        }
    }


    return (
        <div >
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
                <span className="text-2xl font-bold">Active Request</span>
            </div>
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <table className="pl-25 pr-25 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service Provider </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Est.Price/ details</th>
                            <th className="px-4 py-2 text-right-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Dates</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="text-left px-4 py-2">

                                <span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium"> aguardando as resposta.....</span></td>
                            <td className="text-left px-4 py-2">

                                <span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium">Req:Today, 9:00AM </span></td>
                            <td className="text-left px-4 py-2">

                                <Button className="bg-transparent text-black font-semibold rounded-xl px-4 py-2 h-auto">
                                    View request <ChevronRight />
                                </Button></td>
                        </tr>

                        {prestacaoServico.map((item: any) => (
                            <tr>
                                <td className="text-left px-4 py-2">
                                    <div className="flex items-center gap-3"> {/* Container Flexbox */}
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-col"> {/* Container para o texto ficar empilhado verticalmente entre si */}
                                            <p className="font-bold"> {item.disignacao}</p>
                                            <span className="text-slate-500">{item.disignacao} </span>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <span className={`${item.estado == "pendente" ? "bg-orange-100 text-orange-500" : item.estado == "aceite" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"} 
                                    rounded-xl px-4 py-2 font-semibold text-sm h-auto`}>
                                        {item.estado}</span>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <span className=" text-slate-500"> <p>{item.subtotal}</p></span>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium">{item.created_at || item.updated_at}</span></td>
                                <td className="text-left px-4 py-2">
                                    <Button className="bg-blue-500 text-white font-semibold rounded-xl px-4 py-2 h-auto">
                                        Review quote
                                    </Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}