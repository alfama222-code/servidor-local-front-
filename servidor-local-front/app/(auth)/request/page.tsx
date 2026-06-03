"use client"
import BannerRequest from "@/components/banner-request/banner";
import NaveBar from "@/components/navbar/nav-request";
import { Tavela } from "@/components/tabela/tavela";
import { useState } from "react";


export default function RequestPage() {

    const [categorias, setCategorias] = useState([]);

    return (
        <>
            <div className="max-w-6xl mx-auto w-full px-4 pt-4 sm:px-6 lg:px-8">
                <NaveBar />
            </div>
            <BannerRequest />
            <Tavela />
        </>
    );
}