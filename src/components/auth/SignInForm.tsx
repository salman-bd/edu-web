'use client'

import * as z from "zod"  
import { zodResolver } from "@hookform/resolvers/zod"  
import { useForm } from "react-hook-form"  
import Link from "next/link"  
import { useState } from "react"  
import { useToast } from "@/components/ui/use-toast"  
import { useRouter } from "next/navigation"  
import { signInSchema } from "@/schemas/signInSchema"  
import { Input } from "@/components/ui/input"  
import { Button } from "@/components/ui/button"  
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"  
import { Icons } from "@/components/ui/icons"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "../ui/card"



export default function SignInForm() {  
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast();  
  const router = useRouter();

  
  // zod implementation  
  const form = useForm<z.infer<typeof signInSchema>>({  
    resolver: zodResolver(signInSchema),  
    defaultValues: {  
      email: '',  
      password: '',  
      rememberMe: false,
    }  
  })  

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {  
    setIsSubmitting(true);  
    const result = await signIn('credentials', {  
      redirect: false,  
      email: data.email,  
      password: data.password  
    });  
    
    if (result?.error) {  
      console.error("Error details: ", result.error);
      if (result?.error === 'CredentialsSignin') {  
        toast({  
          title: "Login Failed",  
          description: "Incorrect username or password",  
          variant: "destructive"  
        });  
      } else {  
        toast({  
          title: "Error",  
          description: result.error,  
          variant: "destructive"  
        });  
      }  
    }   
    console.log("Sign in result: ", result);
    
    if (result?.url) {  
      router.replace('/dashboard');  
    }  
    setIsSubmitting(false);
  }
  

  return (
    <div className="space-y-6 ">
      <Card className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">       
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                    type="text" 
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
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember me</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button 
            type="submit" disabled={isSubmitting} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>

        <div className='flex flex-row gap-2 pt-4'>  
          <p>Don&apos;t have an account?</p>  
          <Link href="/signup"><span className='text-indigo-700'>Sign Up</span></Link>  
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
          <Button variant="outline" onClick={() => signIn("google", { callbackUrl: "/profile" })}>
            <Image src="/icons/icons8-google.svg" width={24} height={24} alt="Google Icon" />
            <span className="sr-only">Google</span>
          </Button>
          <Button variant="outline" onClick={() => signIn("github", { callbackUrl: "/profile" })}>
            <Image src="/icons/icons8-github.svg" width={24} height={24} alt="GitHub Icon" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button variant="outline" onClick={() => signIn("facebook", { callbackUrl: "/profile" })}>
            <Image src="/icons/icons8-facebook.svg" width={24} height={24} alt="Facebook Icon" />
            <span className="sr-only">Facebook</span>
          </Button>
        </div>

      </Card>
    </div>
  )
}



