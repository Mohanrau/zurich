import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Exporting the middleware with authentication
export default withAuth(
  function middleware(req) {
    // If the user is not logged in, redirect to the login page
    if (!req.nextauth.token) {
      const loginUrl = new URL('/', req.url); // Custom login page
      return NextResponse.redirect(loginUrl);
    }
  },
  {
    callbacks: {
      // This callback is triggered before allowing access
      authorized: ({ token }) => {
        // Only allow access if the user has a token
        return !!token;
      },
    },
  }
);

// Define the routes you want to protect
export const config = {
  matcher: ['/dashboard'], // Protect specific routes
};
