import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";


interface CategoriaType {
    id: string;
    name: string;
    icone: string;
    price: string;
}

interface PedidoCardProps {
    title: string;
    description: string;
    image: any;
    category: CategoriaType;
    text: string;
}


export const PedidoCard = (pedidoCardProps: PedidoCardProps) => {
    return (
        <Card className="rounded-xl shadow-sm bg-white p-4 py-0">
            <CardHeader className="p-0 mb-2 relative -mx-4 -mt-0">
                {/* Container da imagem com rounded interno */}
                <div className="h-45 w-full overflow-hidden">
                    <div className="relative h-44 overflow-hidden">
                        <Image
                            className="object-cover object-top opacity-50"
                            src={pedidoCardProps.image}
                            alt={pedidoCardProps.title}
                            width={1920}
                            height={1080}
                        />
                    </div>
                    {/* Badge do Ícone Centralizado  */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-3 rounded-full shadow-md text-blue-500">
                            <span className="text-xl">
                                {pedidoCardProps.category.icone}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-2 px-0">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-medium text-slate-800">
                        {pedidoCardProps.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed ">
                        {pedidoCardProps.description}
                    </p>
                </div>
            </CardContent>

            <CardFooter className="flex items-cente justify-between px-0 pb-">
                <h4 className="font-semibold text-lg pt- text-blue-600">
                    <p className="font-semibold text-slate-500">{pedidoCardProps.text}</p>
                    {pedidoCardProps.category.price}</h4>

                <Button
                    className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6 py-3 font-bold h-auto">
                    Browse Providers
                </Button>
            </CardFooter>
        </Card>
    );
}
