"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { z } from "zod"
import { toast } from "sonner"
import FormFieldComponent from "./FormField"
import { useRouter } from "next/navigation"


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional,
        email: z.string().email(),
        password: z.string().min(3), 
    })
}

const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(type === 'sign-up'){
                console.log("sign up", values);
                toast.success("Account created successfully");
                router.push('/sign-in');
            }else{
                console.log("sign in", values);
                toast.success("Sign In successfully");
                router.push('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error ${error}`);
        }
    }

    const isSignIn = type === 'sign-in';
  return (
    <div className="card-border lg:min-w-[566px]" >
        <div className="flex flex-col gap-6 card py-14 px-10" >
            <div className="flex flex-row gap-2 justify-center">
                <Image src="./logo.svg" alt="logo" 
                height={32} width={38}  />
                <h2 className="text-primary-100" >Prepewise</h2>
            </div>
            <h2 className="text-primary-100" >Practive Job Interview With AI</h2>
            
            <Form {...form}>
                <form className="w-full space-y-6 mt-4 form" onSubmit={form.handleSubmit(onSubmit)}>
                    {
                        !isSignIn && <FormFieldComponent
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Enter Your Name"
                        />
                    }
                    <FormFieldComponent
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter Your Email"
                        type="email"
                    />
                    <FormFieldComponent
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter Your Password"
                        type="password"
                    />
                    
                    <Button className="btn" type="submit">{
                        isSignIn ? 'Sign in' : 'Create an account'
                    }</Button>

                    <p className="text-center">
                        {
                            isSignIn ?
                            'No Account Yet?'
                            :
                            'Have an account already?'
                        }
                        <Link href={!isSignIn ? '/sign-in' : '/sign-up'} 
                        className="font-bold text-user-primary ml-1">
                            {!isSignIn ? 'Sign In' : 'Sign Up'}    
                        </Link> 
                    </p>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default AuthForm;