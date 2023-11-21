import { getServerSession } from "next-auth/next"
import { authOptions } from "@/libs/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <h1>This is the main page</h1>
      {
        session !== null ? <pre>{JSON.stringify(session, null, 2)}</pre>
          :
          <Link
            href="/login"
            className="text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
          >
            Login
          </Link>
      }
    </section>
  )
}
