import { Navbar } from "@/components/common/Navbar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
