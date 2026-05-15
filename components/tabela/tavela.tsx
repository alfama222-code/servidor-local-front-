"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";



<<<<<<< HEAD

export function Tavela() {
    
    return (
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8"> {/* Container principal */}

            {/* Novo Container Flex: Alinha os itens horizontalmente e nas extremidades */}
            <div className="flex items-center justify-between mb-4">

                {/* Lado Esquerdo: Texto */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Active Request
                    </span>
                </div>

                {/* Lado Direito: Botão */}
                <div className="flex items-center h-10 gap-3">
                    <       Button className="w-24 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center gap-2 border-none cursor-pointer transition-all hover:bg-slate-300 dark:hover:bg-slate-700 shadow-md">
                        <FilterIcon />
                        <span className="text-lg font-medium text-slate-700 dark:text-slate-200">
                            Filter
                        </span>
                    </Button>
                </div>
=======
export const Tavela = () => {
    const [prestacaoServico, setPrestacaoServico] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/prestacao_servico/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

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
        } catch (error) {
            console.error(error);

            toast.error(
                "Erro ao conectar com o servidor!"
            );
        }
    };

    return (
        <div>
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
                <span className="text-2xl font-bold">
                    Active Request
                </span>
>>>>>>> ff3c86f22bb6f4c26d0616e1eae9dad2dab4553e
            </div>

            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <table className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-900">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Service Details
                            </th>

                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Status
                            </th>

                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Est.Price
                            </th>

                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Dates
                            </th>

                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
<<<<<<< HEAD
                        <tr className="border-t border-spacing-5">

                            <td className="text-left px-4 py-2"> <p className="font-bold">Leaking Pipe Repair</p>
                                <span className=" text-slate-500"><p>plumbing 🛠️ </p></span>
                            </td>
                            <td className="text-left px-4 py-2"><span className="bg-[#FFEEDF] rounded-xl px-4 py-2 font-semibold text-sm h-auto text-[#EF971E]">  Pending</span></td>
                            <td className="text-left px-4 py-2"><span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium"> aguardando as resposta.....</span></td>
                            <td className="text-left px-4 py-2"><span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium">Req:Today, 9:00AM </span></td>
                            <td className="text-left px-4 py-2"><Button className="bg-transparent text-black font-semibold rounded-xl px-4 py-2 h-auto cursor-pointer">
                                View request <ChevronRight />
                            </Button></td>
                        </tr>

                        <tr className="border-t">
                            <td className="text-left px-4 py-2">
                                <div className="flex items-center gap-3"> {/* Container Flexbox */}
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-col"> {/* Container para o texto ficar empilhado verticalmente entre si */}
                                        <p className="font-bold">Install Ceiling Fan</p>
                                        <span className="text-slate-500">Sparky electrics LLC</span>
                                    </div>
=======
                        {/* Linha fixa */}
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                            <td className="px-4 py-2">
                                <div className="text-black font-medium flex flex-col">
                                    <p>Leaking Pipe Repair</p>
                                    <span className="text-slate-500">plumbing</span>
>>>>>>> ff3c86f22bb6f4c26d0616e1eae9dad2dab4553e
                                </div>
                            </td>

                            <td className="px-4 py-2">
                                <span className="text-slate-500 font-medium">
                                    pending quotes
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-slate-500">
                                    waiting for estimates
                                </span>
                            </td>

                            <td className="px-4 py-2">
                                <span className="text-slate-500">
                                    Today
                                </span>
                            </td>

                            <td className="px-4 py-2">
                                <button className=" text-slate-500 hover:text-blue-500 flex items-center gap-2 cursor-pointer">
                                    View Request
                                    <ChevronRight />
                                </button>
                            </td>
                        </tr>

                        {/* Dados vindos da API */}
                        {prestacaoServico.map((item: any) => (
                            <tr
                                key={item.id}
                                className="border-t border-slate-200 dark:border-slate-700"
                            >
                                <td className="text-left px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>
                                                CN
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col">
                                            <p className="font-bold">
                                                {item.disignacao}

                                            </p>

                                            <span className="text-slate-500">
                                                {item.disignacao}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <span
                                        className={`${item.estado === "pendente"
                                            ? "bg-orange-100 text-orange-500"
                                            : item.estado === "aceite"
                                                ? "bg-green-50 text-green-500"
                                                : "bg-red-50 text-red-500"
                                            } rounded-xl px-4 py-2 font-semibold text-sm inline-block`}
                                    >
                                        {item.estado}
                                    </span>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <p className="text-slate-500">
                                        {item.subtotal}
                                    </p>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <span className="text-slate-500">
                                        Req: Today{" "}
                                        {item.created_at || item.updated_at}
                                    </span>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <Button className="bg-blue-600 text-white hover:bg-blue-500 opacity-90 cursor-pointer font-semibold rounded-xl px-4 py-2 h-auto">
                                        Review quote
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};