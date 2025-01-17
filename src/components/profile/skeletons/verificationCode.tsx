'use client';  

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";  
import  { Skeleton }  from "@/components/ui/skeleton"; // Assuming you have or will create a Skeleton component  

export function StudentCodeVerificationSkeleton() {  
  return (  
    <Card className="w-full max-w-md mx-auto">  
      <CardHeader>  
        <CardTitle>  
          <Skeleton className="h-6 w-3/4" />  
        </CardTitle>  
        <CardDescription>  
          <Skeleton className="h-4 w-5/6" />  
        </CardDescription>  
      </CardHeader>  
      <CardContent>  
        <div className="space-y-4">  
          <div className="space-y-2">  
            <Skeleton className="h-6 w-full" />  
            <Skeleton className="h-10 w-full" />  
          </div>  
          <Skeleton className="h-4 w-5/6" />  
          <Skeleton className="h-4 w-5/6" />  
        </div>  
      </CardContent>  
      <CardFooter className="flex flex-col gap-4">  
        <Skeleton className="h-10 w-full" />  
        <div className="flex justify-between w-full">  
          <Skeleton className="h-10 w-full" />  
        </div>  
      </CardFooter>  
    </Card>  
  );  
}  

export default StudentCodeVerificationSkeleton;