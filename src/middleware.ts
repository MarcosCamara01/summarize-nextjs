export { default } from "next-auth/middleware";

export const config = { matcher: ["/overview", "/create", "/summaries/:path*"] };