import BLOG from '@/blog.config'
import Link from 'next/link'
import Social from '../Common/Social.js'
import { useState } from 'react'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import {  ClipboardCheckIcon} from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import VideosAvatar from './VideosAvatar'
import { NotionRenderer } from 'react-notion-x'


const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then((m) => m.Collection), { ssr: true }
)

const VideosHero = ({ blockMap }) => {
  const [showCopied, setShowCopied] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]

  const clickCopy = async () => {
    setShowCopied(true)
    navigator.clipboard.writeText(BLOG.link + '/feed')
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  return <>
    <div className='container mx-auto flex px-5 py-2 mb-10 md:flex-row flex-col items-center'>
      <div className='flex flex-col md:w-4/5 md:items-start mb-6 md:mb-0 md:text-left'>
        <NotionRenderer
          className='md:ml-0'
          recordMap={blockMap}
          components={{ Collection }}
        />
        <Social />
      </div>
      <div className='w-2/5'>
        {/* <CameraIcon className='object-cover object-center text-gray-500 dark:text-gray-300' />  */}
        <VideosAvatar className='text-gray-600 dark:text-gray-300' /> 
      </div>
    </div>
  </>;
}

export default VideosHero
