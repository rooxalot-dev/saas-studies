import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import Seo from '@components/Seo'

import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {
  return (
    <>
      <Seo title={'My SAAS'} />

      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='mt-10 text-3xl font-bold'>Hello!</h1>

        <ul className='block text-center pt-10'>
          <li><Link href={'/app'}>Adm</Link></li>
          <li><Link href={'DevIO'}>DevIO Tenant</Link></li>
        </ul>
        <p>
          <Auth />
        </p>
      </div>
    </>
  )
}

export function Auth() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.name} ({session.user?.email}) <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn(undefined, { callbackUrl: '/app' })}>Sign in</button>
    </>
  )
}

export default Home;
