import { getServerSession } from "next-auth/next"
import { authOptions } from "@/libs/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      {
        session !== null ?
          <>
            <h1>This is the main page for authenticated users</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </>
          :
          <>
            <h1>This is the main page for unauthenticated users</h1>
            <Link
              href="/login"
              className="text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
            >
              Login
            </Link>
          </>
      }
    </section>
  )
}
