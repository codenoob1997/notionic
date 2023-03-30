import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  NewspaperIcon,
  CollectionIcon,
  SparklesIcon,
  SearchIcon,
  MenuIcon
} from '@heroicons/react/outline'
import Social from '../Common/Social.js'
import ThemeSwitcher from './ThemeSwitcher.js'
import LangSwitcher from './LangSwitcher.js'
import { motion } from 'framer-motion'

const NavBar = () => {
  const router = useRouter()
  const { locale } = useRouter()
  const t = lang[locale]
  const [showMenu, setShowMenu] = useState(false)

  let activeMenu = ''
  if (router.query.slug) {
    activeMenu = '/' + router.query.slug
  } else {
    activeMenu = router.pathname
  }

  const links = [
    {
      id: 0,
      name: t.NAV.INDEX,
      to: BLOG.path || '/',
      icon: <HomeIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 1,
      name: t.NAV.NEWSLETTER,
      to: '/newsletter',
      icon: <NewspaperIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.newsletter
    },
    {
      id: 2,
      name: t.NAV.NOTES,
      to: '/notes',
      icon: <CollectionIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.notes
    },
    {
      id: 3,
      name: t.NAV.PROJECTS,
      to: '/projects',
      icon: <SparklesIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.projects
    },
    {
      id: 4,
      name: t.NAV.SEARCH,
      to: '/search',
      icon: <SearchIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    }
  ]
  return (
    <motion.div className='flex'>
      {/* Desktop Menu */}
      <ul className='hidden md:flex md:gap-1'>
        {links.map(
          (link) =>
            link.show && (
              <Link passHref href={link.to} key={link.id} scroll={false}>
                <li
                  className={`${
                    activeMenu === link.to ? 'bg-gray-200 dark:bg-gray-700' : ''
                  } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block py-1 px-2 nav`}
                >
                  <div className='font-light'>
                    {link.icon}
                    <span className='inline-block m-1'>{link.name}</span>
                  </div>
                </li>
              </Link>

            )
        )}
      </ul>

      <ThemeSwitcher />
      <LangSwitcher />

      {/* Mobile Phone Menu */}
      <div className='md:hidden mr-2 block '>
        <button
          type='button' aria-label='Menu'
          onClick={() => setShowMenu((showMenu) => !showMenu)}
          className='hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block p-2 -mr-3 md:pb-3'
        >
          <MenuIcon className='inline-block mb-1 h-5 w-5' />
        </button>
        {showMenu && (
          <div className='absolute right-0 w-40 mr-4 mt-2 origin-top-right bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600 rounded-md shadow-lg outline-none'>
            <div className='py-1'>
              {links.map(
                (link) =>
                  link.show && (
                    <Link passHref key={link.id} href={link.to} scroll={false}>
                      <a
                        onClick={() => setShowMenu((showMenu) => !showMenu)}
                        className='hover:bg-gray-100 dark:hover:bg-gray-600 font-light block justify-between w-full px-4 py-2 leading-5'
                      >
                        {link.icon}
                        <span className='m-1'>{link.name}</span>
                      </a>
                    </Link>
                  )
              )}
            </div>
            <div className='px-4 py-4'>
              <Social />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const [showTitle, setShowTitle] = useState(false)
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinelRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        setShowTitle(true)
      } else {
        setShowTitle(false)
      }
    })

    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinelRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinelRef.current) obvserver.unobserve(sentinelRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinelRef])
  return (
    <>
      <div className='observer-element h-4 md:h-12' ref={sentinelRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id='sticky-nav'
        ref={navRef}
      >
        <div className='flex items-center'>
          <Link passHref href='/' scroll={false}>
            <a aria-label={BLOG.title}>
              <motion.div className='h-6 hover:text-blue-500 dark:hover:text-blue-500 fill-current'>
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="48.000000pt" height="48.000000pt" viewBox="0 0 48.000000 48.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,48.000000) scale(0.200000,-0.200000)"
fill="#000000" stroke="none">
<path d="M133 358 c-35 -25 -48 -51 -57 -115 -5 -37 -3 -44 18 -59 20 -12 23
-19 15 -33 -16 -24 47 -145 78 -149 22 -3 21 -2 -9 58 -16 34 -28 63 -26 65
12 12 81 -25 98 -52 25 -42 79 -73 126 -72 22 0 32 3 24 6 -8 3 -26 10 -40 15
-34 13 -13 23 63 33 59 7 78 24 30 26 l-28 1 28 11 c31 13 37 32 7 22 -12 -4
-28 -1 -37 7 -13 10 -17 10 -20 1 -3 -7 -16 -13 -30 -13 -14 0 -37 -7 -53 -16
-28 -17 -60 -14 -60 5 0 12 71 51 119 66 45 13 53 35 13 35 l-30 0 4 56 c2 48
0 59 -19 76 -60 52 -159 64 -214 26z m53 -56 c-12 -12 -18 8 -10 35 l8 28 4
-28 c2 -16 1 -31 -2 -35z m34 -37 c17 -21 5 -61 -21 -68 -30 -8 -48 2 -55 29
-8 30 11 54 41 54 12 0 28 -7 35 -15z m128 -28 c5 -40 -14 -59 -51 -51 -20 4
-27 3 -23 -5 4 -6 16 -11 27 -11 28 0 14 -18 -28 -35 -45 -19 -99 -7 -133 30
-26 28 -22 42 8 26 46 -24 92 -2 92 44 0 18 6 25 28 28 59 9 77 4 80 -26z m37
-57 c-27 -12 -43 -12 -25 0 8 5 22 9 30 9 10 0 8 -3 -5 -9z m5 -100 c0 -5 -12
-10 -27 -10 -22 0 -25 2 -13 10 20 13 40 13 40 0z"/>
<path d="M398 323 c-2 -5 -1 -33 3 -63 l6 -55 1 63 c2 57 -1 74 -10 55z"/>
</g>
</svg>

              </motion.div>
            </a>
          </Link>
          {navBarTitle ? (
            <p
              className={`ml-2 font-medium ${
                !showTitle ? 'hidden' : 'hidden xl:block'
              }`}
            >
              {navBarTitle}
            </p>
          ) : (
            <p
              className={`ml-2 font-medium ${
                !showTitle ? 'hidden' : 'hidden xl:block'
              }`}
            >
              {BLOG.title},{' '}
              <span className='font-normal'>{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
