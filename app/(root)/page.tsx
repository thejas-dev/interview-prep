 import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
 
 const Page = () => {
   return (
     <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
            <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
            <p className='text-lg' >
              practice on real interview questions & get feedback
            </p>
            <Button asChild className='btn-primary max-sm:w-full'>
              <Link href="/interview">Start an Interview</Link>
            </Button>
        </div>
        <Image 
          src='/robot.png' 
          alt='robo' 
          width={400} 
          height={400} 
          className='max-sm:hidden' 
        />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview,j)=>(
            <InterviewCard key={j} {...interview} />
          ))}

          {/* <p>
            You haven&apos;t taken any interviews yet
          </p> */}
        </div>
      </section>

      <div className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
         {dummyInterviews.map((interview,j)=>(
            <InterviewCard key={j} {...interview} />
          ))}
        <div className='interviews-section'>
          <p>There are no interviews available</p>
        </div>
      </div>

     </>
   )
 }
 
 export default Page