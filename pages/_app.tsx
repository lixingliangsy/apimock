import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import Script from 'next/script'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'
const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_ID
const UMAMI_URL = (process.env.NEXT_PUBLIC_UMAMI_URL || 'https://analytics.umami.is').replace(/\/$/, '')

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <>
      {UMAMI_ID && (
        <Script
          async
          src={`${UMAMI_URL}/script.js`}
          data-website-id={UMAMI_ID}
          strategy="afterInteractive"
        />
      )}
return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MockDeck" />
        <meta property="og:description" content="Describe an endpoint and get a mock API spec - OpenAPI 3, Postman, or raw routes - with realistic sample responses so your frontend team can build before the backend is ready." />
        <meta property="og:url" content="https://apimock.lxsaihub.com/" />
        <meta property="og:image" content="https://apimock.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MockDeck" />
        <meta name="twitter:description" content="Describe an endpoint and get a mock API spec - OpenAPI 3, Postman, or raw routes - with realistic sample responses so your frontend team can build before the backend is ready." />
        <meta name="twitter:image" content="https://apimock.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"MockDeck","url":"https://apimock.lxsaihub.com/","description":"Describe an endpoint and get a mock API spec - OpenAPI 3, Postman, or raw routes - with realistic sample responses so your frontend team can build before the backend is ready.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
    </>
  )
}
