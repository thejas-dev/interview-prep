
import { Toaster } from "@/components/ui/sonner"
import { ReactNode } from "react"


const AuthLayout = ({ children } : { children: ReactNode }) => {

    

    return (
        <div className='auth-layout'>
            {children}
            <Toaster />
        </div>
    )
}

export default AuthLayout