// components/ui/skeleton.js  
import React from 'react';  

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {  
  return (  
    <div className={`skeleton ${className}`}>  
      <style jsx>{`  
        .skeleton {  
          background-color: #e0e0e0;  
          border-radius: 4px;  
          animation: pulse 1.2s infinite ease-in-out;  
        }  

        @keyframes pulse {  
          0% {  
            opacity: 1;  
          }  
          50% {  
            opacity: 0.5;  
          }  
          100% {  
            opacity: 1;  
          }  
        }  
      `}</style>  
    </div>  
  );  
};  
