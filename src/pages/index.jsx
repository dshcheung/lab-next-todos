import Link from 'next/link'

export default function Home() {
  return (
    <div id="pages-home">
      <div>
        <Link href="/ssg"><a>SSG</a></Link>
      </div>

      <div>
        <Link href="/swr-external"><a>SWR External</a></Link>
      </div>

      <div>
        <Link href="/swr-self"><a>SWR Self</a></Link>
      </div>
    </div>
  )
}
