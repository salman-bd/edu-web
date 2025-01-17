'use client';  

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";  
import  { Skeleton }  from "@/components/ui/skeleton"; // Assume you have a skeleton component  

function ProfileInputSkeleton() {  
  return (  
    <div className='flex justify-center items-center bg-gray-100'>  
      <div className='w-full p-8 space-y-8 bg-white rounded-lg shadow-md'>  
        <Card className="w-full">  
          <CardHeader>  
            <CardTitle>  
              <Skeleton className="h-6 w-3/4" />  
            </CardTitle>  
            <CardDescription>  
              <Skeleton className="h-4 w-2/3" />  
            </CardDescription>  
          </CardHeader>  
          <CardContent>  
            <div className="space-y-8">  
              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-6 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  
              
              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-6 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  

              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-6 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  

              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-6 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  

              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-6 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  
              
              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-6 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  

              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-6 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  

              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-6 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  

              <div className="flex flex-col space-y-2">  
                <Skeleton className="h-10 w-full" />  
                <Skeleton className="h-10 w-full" />  
              </div>  

              <button className="flex items-center justify-center h-10 w-full rounded-md bg-gray-300">  
                <Skeleton className="h-6 w-1/3" />  
              </button>  
            </div>  
          </CardContent>  
        </Card>  
      </div>  
    </div>  
  );  
}  

export default ProfileInputSkeleton;