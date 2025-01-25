'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'


function SignUp() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);
  const { toast } = useToast();
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage('');
      }
      try {
        const response = await axios.get(`/api/check-username-unique?username=${username}`);
        setUsernameMessage(response.data.message);

      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(axiosError.response?.data.message?? "Error checking username")
      }
      finally {
        setIsCheckingUsername(false);
      }
    }
    checkUsernameUnique();
  }, [username]);


  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {  
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
        router.replace(`/verify/${data.username}`);  

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
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md"> 
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your email and password to create your account.</CardDescription>
        </CardHeader>    
        <CardContent className="space-y-4">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                      placeholder="" 
                      {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField  
                control={form.control}  
                name="username"  
                render={({ field }) => (  
                  <FormItem>  
                    <FormLabel>Username</FormLabel>  
                    <FormControl>  
                      <Input   
                        placeholder="Type username"   
                        {...field}  
                        onChange={(e) => {field.onChange(e); debounced(e.target.value)}}  
                      />
                    </FormControl> 
                    {isCheckingUsername && <Loader2 className="animate-spin"/>}
                    <p className={`text-sm ${usernameMessage === "Username is unique" ? 'text-green-500' : 'text-red-500'}`}>
                      {usernameMessage}
                    </p>
                    <FormMessage />  
                    {/* {usernameMessage && <p className="text-red-600">{usernameMessage}</p>}   */}
                  </FormItem>  
                )}  
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                      placeholder="" 
                      {...field}
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
                          placeholder="••••••••" 
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full"> 
                  {
                  isSubmitting? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ) : ('Create Account')
                  }
                </Button>
              </CardFooter>
            </form>
          </Form>
          </CardContent>
        </Card>
        <div>
          <p>
            Already Signed Up? {' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp;