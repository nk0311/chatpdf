// import { Button } from '@/components/ui/button';
// import { ClerkProvider, UserButton } from '@clerk/nextjs';

// export default function Home() {
//   return (
//     <ClerkProvider afterSignOutUrl="/">
//       <div className="ww-screen min-h-screen bg-gradient-to-r from-slate-500 to-yellow-100">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           <div className="flex flex-col items-center text-center">
//             <div className="flex items-center">
//               <h1 className="mr-3 text-5xl font-semibold">Interact with any PDF</h1>
//               <UserButton />
//             </div>
//             <div className="flex mt-2">
//               <Button>Head to chats</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ClerkProvider>
//   );
// }
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link';
import {LogIn} from 'lucide-react'

export default async function Home() {
  const {userId} = await auth()
  const isAuth = !!userId
  return (
    <div className="ww-screen min-h-screen bg-gradient-to-r from-slate-500 to-yellow-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Interact with any PDF</h1>
            <UserButton />
          </div>
          <div className="flex mt-2">
            {isAuth && <Button>Head to chats</Button>}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
          Face it: AI is everything you aren't—fast, insightful, and at the heart of our platform. Plug into a powerful network to get instant answers and insights, all powered by AI-driven research.
          </p>

          <div className="w-full mt-4">
            {isAuth ? (<h1>fileupload</h1>):(
              <Link href='/sign-in'>
                <Button>
                  Login to start
                  <LogIn className="w-4 h-4 ml-2"/>
                </Button>

              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
