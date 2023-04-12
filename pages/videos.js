import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import VideosHero from '@/components/Hero/Videos'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import VideosAvatar from '@/components/Hero/VideosAvatar'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyVideos: true })

  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'videos')

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

const videos = ({ posts, blockMap }) => {
  return (
    <Container title={BLOG.videos} description={BLOG.description}>
      <VideosHero blockMap={blockMap} />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default videos