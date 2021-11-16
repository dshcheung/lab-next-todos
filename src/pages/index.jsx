import Link from 'next/link'

export default function Home() {
  return (
    <div id="pages-home">
      <div>
        <Link href="/ssg"><a>SSG</a></Link>
      </div>

      <div>
        <Link href="/swr"><a>SWR</a></Link>
      </div>
    </div>
  )
}
