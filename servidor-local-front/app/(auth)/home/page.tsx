import { Banner } from "@/components/banner/banner";
import { PedidoCard } from "@/components/cor/pedido_card";
import Nav from "@/components/navbar/nav";
import { Sidebar } from "@/components/sidbars/sidbar";
import Link from "next/link";


const pedidocard = [
    {
        id: "1",
        title: "Emergency Plumbing",
        description: "24/7 support for leaks, pipe bursts and urgent issues.",
        image: "https://t3.ftcdn.net/jpg/07/57/77/04/360_F_757770487_eBau5hsSuH24ax3FmYKTIHqZ1sAHAjFn.jpg",
        category: {
            id: "1",
            name: "Plumbing",
            icone: "🔧",
            text: "STARTING AT",
            price: "$89.00"
        }
    },
    {
        id: "2",
        title: "Light Fixture Installation",
        description: "Professional installation for chandeliers, sconces and lighting.",
        image: "https://t3.ftcdn.net/jpg/07/57/77/04/360_F_757770487_eBau5hsSuH24ax3FmYKTIHqZ1sAHAjFn.jpg",
        category: {
            id: "2",
            name: "Elétrica",
            icone: "💡",
            text: "AVERAGE QUOTE",
            price: "$120 - $250"

        }
    },
    {
        id: 3,
        title: "Custom Cabinetry",
        description: "Bespoke storage solutions and repairs for your kitchen or living space.",
        image: "https://t3.ftcdn.net/jpg/07/57/77/04/360_F_757770487_eBau5hsSuH24ax3FmYKTIHqZ1sAHAjFn.jpg",
        category: {
            id: "3",
            name: "Cooling",
            icone: "❄️",
            text: "STARTING AT",
            price: "$450.00"
        }
    },
    {
        id: 4,
        title: "Interior Wall Painting",
        description: "Precision painting for single rooms or entire home interiors.",
        image: "https://t3.ftcdn.net/jpg/07/57/77/04/360_F_757770487_eBau5hsSuH24ax3FmYKTIHqZ1sAHAjFn.jpg",
        category: {
            id: "4",
            name: "Painting",
            icone: "❄️",
            text: "AVERAGE QUOTE",
            price: "$2.50 / sqft"
        }
    },
    {
        id: 5,
        title: "AC Maintenance",
        description: "Seasonal cleaning and efficiency checks for cooling systems.",
        image: "https://t3.ftcdn.net/jpg/07/57/77/04/360_F_757770487_eBau5hsSuH24ax3FmYKTIHqZ1sAHAjFn.jpg",
        category: {
            id: "5",
            name: "Cooling",
            icone: "❄️",
            text: "STARTING AT",
            price: "$125.00"
        }
    },
    {
        id: 6,
        title: "Smarting Lock Setup",
        description: "Installation and synchronization of digitalsecurity locks cameras.",
        image: "https://t3.ftcdn.net/jpg/07/57/77/04/360_F_757770487_eBau5hsSuH24ax3FmYKTIHqZ1sAHAjFn.jpg",
        category: {
            id: "6",
            name: "Cooling",
            icone: "❄️",
            text: "AVERAGE QUOTE",
            price: "$150 - $300"
        }
    },
];


export default function HomePage() {
    return (
        <>
            <div className="min-h-screen bg-slate-50">
                {/* Navbar no topo */}
                <Nav />
                <nav className="flex px-4 sm:px-6 md:px-12 lg:px-10 p-4 items-center">
                    <Link className="text-gray-600 hover:text-blue-500 transition-colors"
                        href="#">Home</Link>
                    <span className="text-gray-400 mx-1">{'>'}</span>
                    <span className="text-blue-500 font-medium">Services</span>
                </nav>
                <div className="flex px-4 sm:px-6 md:px-12 lg:px-10 py-6">
                    {/* Sidebar fixa à esquerda */}
                    <Sidebar />

                    {/* Conteúdo principal */}
                    <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 lg:px-10">
                        <Banner />

                        {/* A GRELHA: 1 coluna no mobile, 2 no tablet, 3 no desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {pedidocard.map((pedido) => (
                                <PedidoCard
                                    key={pedido.id}
                                    title={pedido.title}
                                    description={pedido.description}
                                    image={pedido.image}
                                    category={pedido.category}
                                    text={pedido.category.text}
                                />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}