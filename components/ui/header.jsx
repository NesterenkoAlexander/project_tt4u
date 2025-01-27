import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"

const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href='/'>
          <Image
          src={'/logo.png'}
          alt="project_tt4u logo"
          height={60}
          width={200}
          className="h-auto w-auto object-contain"
          />
        </Link>
      
      <SignedOut>
      <SignInButton forceRedirectUrl="/dashboard">
        <Button variant='outline'>Войти</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </nav>
    </div>
  )
}

export default Header