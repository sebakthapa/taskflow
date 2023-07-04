import Image from 'next/image'
import Darkmode from "darkmode-js"
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function Home() {
  // const router = useRouter();

  return (
    <div className='flex flex-col gap-10 p-10'>
      <Link href="/auth/signup" > SIGNUP</Link>
      <Link href="/auth/signin" > signin</Link>
      <Link href="/auth/verify_email" > verify email</Link>
      <Link href="/dashboard" >dashboard </Link>



    </div>
  )
}
