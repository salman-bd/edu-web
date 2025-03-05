'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from 'lucide-react'

import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';

import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';



export default function VerifyAccount() {
  const [verifyCode, setVerifyCode] = useState(['', '', '', '', '', ''])
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);


  const router = useRouter();
  const params = useParams<{ email: string }>();
  const { toast } = useToast();

  
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setVerifyCode([...verifyCode.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLElement).focus()
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    // Simulate API call to resend OTP
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsResending(false)
  }


  const handleVerifyCode = async (data: z.infer<typeof verifySchema>) => {
    setIsVerifying(true)
    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        email: params.email,
        code: data.code,
      });

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace('/signin');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Verification Failed',
        description:
          axiosError.response?.data.message ??
          'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false)
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Enter Verification Code</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit code to your email. Enter it below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-2 mb-4">
          {verifyCode.map((data, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              className="w-10 h-10 text-center"
            />
          ))}
        </div>
        <div className="text-center mb-4">
          {/* <Label>
            Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Label> */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          onClick={() => handleVerifyCode({ code: verifyCode.join('') })} 
          className="w-full bg-indigo-600 hover:bg-indigo-500" 
          disabled={verifyCode.some(digit => digit === '') || isVerifying}
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Account'
          )}
        </Button>
        <div className="flex justify-between w-full">
          <Button variant="outline" className="w-1/2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button 
            variant="outline" 
            className="w-1/2" 
            onClick={handleResendOTP}
            disabled={isResending}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              'Resend Verification Code'
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}


