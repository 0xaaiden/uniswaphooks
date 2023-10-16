import ChainCard from '@component/ChainCard'

export default function ChainGrid({ chainPosts }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {chainPosts.map((chainPost) => (
        <li key={chainPost.slug}>
          <ChainCard chainPost={chainPost} />
        </li>
      ))}
    </ul>
  )
}
