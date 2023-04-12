import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
// We use newsletterHero for markdownHero
import MarkdownsHero from '@/components/Hero/Markdowns'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyMarkdowns: true })

  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'markdowns')

  let blockMap
  try {
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  return {
    props: {
      posts,
      blockMap
    },
    revalidate: 1
  }
}

const markdowns = ({ posts, blockMap }) => {
  return (
    <Container title={BLOG.markdown} description={BLOG.description}>
      <MarkdownsHero blockMap={blockMap} />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default markdowns
