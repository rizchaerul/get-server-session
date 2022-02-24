import { getServerSession } from "next-auth/next"
import { getSession, SessionProvider } from "next-auth/react"
import App, { AppContext, AppProps } from "next/app"
import { nextAuthOptions } from "./api/auth/[...nextauth]"

import "./styles.css"

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </SessionProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<any> => {
  const appProps = await App.getInitialProps(appContext)

  // Not error.
  const session = await getSession(appContext.ctx)
  // Error.
  const serverSession = await getServerSession(appContext.ctx, nextAuthOptions)

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      session,
    },
  }
}
