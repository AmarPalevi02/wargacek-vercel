import React from 'react'

const SkeletonCard = () => {
   return (
      <div className="rounded-xl overflow-hidden shadow-md bg-[#fff] mb-4 animate-pulse">
        
         <div className="h-40 bg-gray-300" />
        
         <div className="p-4">
            <div className="h-4 bg-gray-400 rounded w-2/3 mb-2" />
            <div className="h-3 bg-gray-400 rounded w-full mb-1" />
            <div className="h-3 bg-gray-400 rounded w-full mb-1" />
            <div className="h-3 bg-gray-400 rounded w-3/4 mb-4" />

         
            <div className="flex items-center gap-2 mb-2">
               <div className="h-3 w-3 bg-gray-400 rounded-full" />
               <div className="h-3 w-32 bg-gray-400 rounded" />
            </div>

            <div className="flex items-center gap-2">
               <div className="h-3 w-3 bg-gray-400 rounded-full" />
               <div className="h-3 w-24 bg-gray-400 rounded" />
            </div>
         </div>
      </div>
   )
}

export default SkeletonCard
