import Link from 'next/link'

export default function BrandLogo({ fontSize = 'text-md' }) {
  return (
    <Link href="/">
      <div className={`inline-flex gap-1.5 ${fontSize}`}>
        <span className="font-medium text-gray-900">UniswapHooks</span>

        <span aria-hidden="true" role="img">
          🚀
        </span>
      </div>
    </Link>
  )
}
