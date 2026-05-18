
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck } from "@/assets/icons/badge-icon";
import SecurityIcon from "@/assets/icons/security-icon";


export const LeftSection = () => {
    return (
        <div className="w-1/2 flex flex-col justify-center p-10 px-10 gap-4" >
            <Badge variant="secondary">precision concierge service</Badge>
            <h1 className="text-6xl font-bold">Elevate your standart of service</h1>

            <p className="text-lg font-normal  text-gray-600">Experience the pinnacle of personalized
                assistance with our premium concierge service.
                From exclusive reservations to seamless travel
                arrangements, we cater to your every need with
                discretion and efficiency.
            </p>

            <div className="flex gap-4">
                <Card className="px-3 py-7">
                    <CardHeader>
                        <BadgeCheck />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="font-semibold">
                            Login
                        </CardTitle>

                        <CardDescription>
                            Exclusive acess to top-tier providers and clients
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="px-3 py-7">
                    <CardHeader>
                        <SecurityIcon />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="font-semibold" >
                            Security platform
                        </CardTitle>

                        <CardDescription>
                            Enterprise-grade security for all your transactions.
                        </CardDescription>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}