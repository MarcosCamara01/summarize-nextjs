export { default } from "next-auth/middleware";

export const config = { matcher: ["/account/:path*", "/create", "/summaries/:path*"] };