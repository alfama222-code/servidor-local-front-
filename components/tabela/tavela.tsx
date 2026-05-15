
import { FilterIcon } from "@/assets/icons/filter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";



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
            </div>


            <div className="w-full h-full border-1 border-slate dark:border-gray-600/30 rounded-xl overflow-hidden">
                <table className="border-1  w-full border-slate/50 dark:border-gray-500 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                    <thead>
                        <tr className="bg-slate-300 dark:bg-slate-800 rounded-xl ">
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service Provider </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Est.Price/ details</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dates</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>

                    <tbody>
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
                                </div>
                            </td>
                            <td className="text-left px-4 py-2"><span className="bg-blue-50 rounded-xl px-4 py-2 font-semibold text-sm h-auto text-blue-500"> Quote reactived</span></td>
                            <td className="text-left px-4 py-2"> <p className="font-semibold">$125.00 </p> <span className=" text-slate-500">$50/hr +$25 materials  </span></td>
                            <td className="text-left px-4 py-2"><span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium">Req:Oct 24,2023 </span></td>
                            <td className="text-left px-4 py-2"><Button className="bg-blue-500 text-white font-semibold rounded-xl px-4 py-2 h-auto  transition-all cursor-pointer hover:bg-blue-600 shadow-md">
                                Review quote
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
                                        <p className="font-bold">Deck Staining </p>
                                        <span className=" text-slate-500"><p>HoodWorks Pros (2 quotes)</p></span>
                                    </div>
                                </div>
                            </td>
                            <td className="text-left px-4 py-2"><span className="bg-blue-50 rounded-xl px-4 py-2 font-semibold text-sm h-auto text-blue-500"> Quotes reactived</span></td>
                            <td className="text-left px-4 py-2"> <p className="font-semibold">$350.00 -$420.00</p> <span className=" text-slate-500">Est. 6-8 hours  </span></td>
                            <td className="text-left px-4 py-2"><span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium">Req:Oct 22,2023 </span></td>
                            <td className="text-left px-4 py-2"><Button className="bg-blue-500 text-white font-semibold rounded-xl px-4 py-2 h-auto cursor-pointer transition-all hover:bg-blue-600 shadow-md">
                                Compare quote
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
                                        <p className="font-bold">IKEA Wardrobe Assembly </p>
                                        <span className=" text-slate-500"><p> Bob's Builds</p></span>
                                    </div>
                                </div>
                            </td>
                            <td className="text-left px-4 py-2"><span className="bg-green-100 rounded-xl px-4 py-2 font-semibold text-sm h-auto text-green-500"> Booked</span></td>
                            <td className="text-left px-4 py-2"> <p className="font-semibold">$85.00 </p> <span className=" text-green-500">15% frist-time discount  </span></td>
                            <td className="text-left px-4 py-2"><span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium">Tomorow, 10:00AM</span></td>
                            <td className="text-left px-4 py-2"><Button className="bg-white-500 text-black font-semibold rounded-xl px-4 py-2 h-auto cursor-pointer transition-all hover:bg-white shadow-md">
                                Manage Booking
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
                                        <p className="font-bold">Interior painting (Living Room)</p>
                                        <span className=" text-slate-500"><p> Colors splash Pros</p></span>
                                    </div>
                                </div>
                            </td>
                            <td className="text-left px-4 py-2"><span className="bg-[#DFE3E9] rounded-xl px-4 py-2 font-semibold text-sm h-auto text-[#A7ACB1]"> Completed</span></td>
                            <td className="text-left px-4 py-2"> <p className="font-slate-500">$450.00</p>  </td>
                            <td className="text-left px-4 py-2"><span className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium">Req: Oct 15,2023 </span></td>
                            <td className="text-left px-4 py-2"><Button className="bg-white-500 text-black font-semibold rounded-xl px-4 py-2 h-auto cursor-pointer transition-all hover:bg-white shadow-md">
                                Recept & Details <ChevronRight />
                            </Button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}   