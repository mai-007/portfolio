import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 環境変数からユーザー名とパスワードを取得
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export function middleware(request: NextRequest) {
  // if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization');

    if (authHeader) {
      const encodedCredentials = authHeader.split(' ')[1];
      const decodedCredentials = atob(encodedCredentials);
      const [username, password] = decodedCredentials.split(':');

      if (username === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
        return NextResponse.next(); // 認証成功
      }
    }

    // 認証失敗時
    const response = new NextResponse('Authentication required', { status: 401 });
    response.headers.set('WWW-Authenticate', 'Basic realm="Secure Area"');
    return response;
  // }

  // return NextResponse.next();
}

// Basic認証を適用するパスを指定
export const config = {
  matcher: [
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
