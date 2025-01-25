'use client'  

import * as z from "zod"  
import { zodResolver } from "@hookform/resolvers/zod"  
import { useForm } from "react-hook-form"  
import Link from "next/link"  
import { useState } from "react"  
import { useToast } from "@/components/ui/use-toast"  
import { useRouter } from "next/navigation"  
import { signInSchema } from "@/schemas/signInSchema"  
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"  
import { Input } from "@/components/ui/input"  
import { Button } from "@/components/ui/button"  
import { Loader2, LogInIcon, GithubIcon} from "lucide-react"
import { FaGoogle } from 'react-icons/fa';  
import { signIn, useSession } from "next-auth/react"  


function SignIn() {  
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const { toast } = useToast();  
  const router = useRouter();

  const {data: session, status} = useSession();
  
  // zod implementation  
  const form = useForm<z.infer<typeof signInSchema>>({  
    resolver: zodResolver(signInSchema),  
    defaultValues: {  
      identifier: '',  
      password: '',  
    }  
  })  

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {  
    setIsSubmitting(true);  
    const result = await signIn('credentials', {  
      redirect: false,  
      identifier: data.identifier,  
      password: data.password  
    });  
    
    if (result?.error) {  
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

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">  
        <div className="text-center">  
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">  
            Sign In  
          </h1>  
          <p className="mb-4">Sign in to start your journey with us</p>  
        </div>  

        <Form {...form}>  
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">  
            <FormField  
              control={form.control}  
              name="identifier"  
              render={({ field }) => (  
                <FormItem>  
                  <FormLabel>Email/Username</FormLabel>  
                  <FormControl>  
                    <Input placeholder="" {...field} />  
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
                    <Input   
                      type="password"   
                      placeholder=""   
                      {...field}   
                    />  
                  </FormControl>  
                  <FormMessage />  
                </FormItem>  
              )}  
            />  
  
            <Button type="submit" disabled={isSubmitting}>  
              {isSubmitting ? (  
                <>  
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait  
                </>  
              ) : (  
                <>  
                  <LogInIcon className="mr-2" /> Sign In  
                </>  
              )}  
            </Button>  
          </form>  
        </Form> 

        <div className="flex items-center justify-between">  
          <div className="w-full border-t border-gray-300"></div>  
          <span className="mx-2 text-gray-500">OR</span>  
          <div className="w-full border-t border-gray-300"></div>  
        </div>  
        
        <div className="space-y-4">  
          {/* Sign in with Google Button */} 
          <Button   
            type="button"   
            onClick={() => signIn('google', {callbackUrl:'/dashboard'})} 
            className="w-full flex justify-center bg-red-500 text-white hover:bg-red-600"  
          >  
          {status === 'loading' ? (  
                <>  
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />  
                    Please wait  
                </>  
            ) : (  
                <>  
                    <FaGoogle style={{ marginRight: '8px' }} />  
                    Sign in with Google  
                </>  
            )}   
              
          </Button>  

          {/* Sign in with GitHub Button */}  
          <Button   
            type="button"   
            onClick={() => signIn('github', {callbackUrl:'/dashboard'})}   
            className="w-full flex justify-center bg-gray-800 text-white hover:bg-gray-900"  
          >   
          {status === 'loading' ? (  
                <>  
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />  
                    Please wait  
                </>  
            ) : (  
                <>  
                    <GithubIcon className="mr-2" />  
                    Sign in with GitHub 
                </>  
            )}  
          </Button>  
        </div>  
        
        <div>  
          <p>  
            Already have an account?{' '}  
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">  
              Sign In  
            </Link>  
          </p>  
        </div>  
      </div> 

    </div> 
  );  
}  

export default SignIn;