export { default } from "next-auth/middleware";

export const config = { matcher: ["/create", "/summaries/:path*"] };