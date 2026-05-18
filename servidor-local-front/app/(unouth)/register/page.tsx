import { LeftRegist } from "@/components/register/left-regist";
import { RightRegist } from "@/components/register/right-regist";


export default function RegisterPage() {
    return (
        <div className="bg-gray-200  h-screen flex justify-between">
            <LeftRegist />
            <RightRegist />
        </div>
    )
} 