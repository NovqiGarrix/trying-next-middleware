// import type, means only import the type definitions from next/server
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {

//     // Since Middleware runs on every request, we can have a condition
//     // to filter the middleware to only run on specific routes

//     // In this example:
//     // 1. Middleware won't run on /api routes
//     // 2. Middleware wont't run on public folder
//     // 3. Middleware won't run on static files
//     if (req.url.startsWith("/api") || req.url.startsWith(".") || req.url.startsWith("/static")) {
//         return NextResponse.next();
//     }

//     // Create response object
//     const res = NextResponse.next();

//     // And Set a new custom header
//     res.headers.set('From-Middleware', 'Hello, From Middleware');
//     return res;

// }

export function middleware(req: NextRequest) {

    // Protected routes
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        // This are dashboard routes. Only logged in user can access this route

        // Get the session from cookie
        const qid = req.cookies.get("qid");

        // If qid is not present, that means the user is not logged in
        if (!qid) {
            // Redirect to login page
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // Do some check here to verify the qid value

        // We can create a custom header here
        const response = NextResponse.next();
        response.headers.set("is-logged-in", qid);

        // And return the response
        return response;
    }

    // Public routes
    return NextResponse.next();

}