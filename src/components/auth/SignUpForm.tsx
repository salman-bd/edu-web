"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ApiResponse } from "@/types/ApiResponse"
import axios, { AxiosError } from "axios"
import { toast } from "@/components/ui/use-toast"
import { Card } from "../ui/card"


const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
    rememberMe: z.boolean().default(false).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {  
    setIsSubmitting(true);  
    
    try {  
        const response = await axios.post<ApiResponse>('/api/sign-up', data);
        if (response.data.success) {
          const succussMessage = "Please check your email to verify your account.";
          toast({  
            title: "Signup successfull",  
            description: succussMessage,  
            variant: "destructive",  
        });  
          // AlertDescription({
          //   title: succussMessage,
          // })
          // Alert({variant: 'default'}) 
        }  
        router.replace(`/verify/${data.email}`);  

    } catch (error) {  
        const axiosError = error as AxiosError<ApiResponse>;  
        const errorMessage = axiosError.response?.data.message || "An unexpected error occurred. Please try again.";  
        
        // If using a toast, it's already good  
        toast({  
            title: "Signup failed",  
            description: errorMessage,  
            variant: "destructive",  
        });  
        
        // Optionally, you could also log the error to the console  

    } finally {  
        setIsSubmitting(false);  
    }  
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder="Your name" 
                    {...field} 
                    className=" w-full px-3 py-2 border border-gray-300 outline-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input 
                    type="email" 
                    placeholder="user@example.com" 
                    {...field} 
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                      type={showPassword ? "text" : "password"} 
                      {...field} 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                      type={showConfirmPassword ? "text" : "password"}
                      {...field} 
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
            type="submit" disabled={isSubmitting} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>

        <div className='flex flex-row gap-2 pt-4'>  
          <p>Already have an account?</p>  
          <Link href="/signin"><span className='text-indigo-700'>Sign In</span></Link>  
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" onClick={() => signIn("google", { callbackUrl: "/" })}>
            <Image src="/icons/icons8-google.svg" width={24} height={24} alt="Google Icon" />
            <span className="sr-only">Google</span>
          </Button>
          <Button variant="outline" onClick={() => signIn("facebook", { callbackUrl: "/" })}>
            <Image src="/icons/icons8-facebook.svg" width={24} height={24} alt="Facebook Icon" />
            <span className="sr-only">Facebook</span>
          </Button>
          <Button variant="outline" onClick={() => signIn("github", { callbackUrl: "/" })}>
            <Image src="/icons/icons8-github.svg" width={24} height={24} alt="GitHub Icon" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </Card>

    </div>
  )
}

export default SignUp;