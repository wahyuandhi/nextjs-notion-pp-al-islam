import type * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

function FloatingNav({ open, children, onClose }: { 
  open: boolean; 
  children: React.ReactNode;
  onClose: () => void 
}) {
  const navRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  if (!open) return null
  return ReactDOM.createPortal(
    <nav ref={navRef} className="responsive-nav open">
      {children}
    </nav>,
    typeof window !== 'undefined' ? document.body : null
  )
}

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()

  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleCloseMenu = React.useCallback(() => {
    setMenuOpen(false)
  }, [])

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />
        <button
          className='hamburger'
          onClick={() => setMenuOpen((open) => !open)}
          aria-label='Toggle navigation menu'
        >
          {/* Hamburger icon */}
          <span />
          <span />
          <span />
        </button>
        {!menuOpen && (
          <nav className="responsive-nav">
            {navigationLinks?.map((link, index) => {
              if (!link?.pageId && !link?.url) return null
              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            }).filter(Boolean)}
            <ToggleThemeButton />
            {isSearchEnabled && <Search block={block} title={null} />}
          </nav>
        )}
        <FloatingNav open={menuOpen} onClose={handleCloseMenu}>
          {navigationLinks?.map((link, index) => {
            if (!link?.pageId && !link?.url) return null
            if (link.pageId) {
              return (
                <components.PageLink
                  href={mapPageUrl(link.pageId)}
                  key={index}
                  className={cs(styles.navLink, 'breadcrumb', 'button')}
                >
                  {link.title}
                </components.PageLink>
              )
            } else {
              return (
                <components.Link
                  href={link.url}
                  key={index}
                  className={cs(styles.navLink, 'breadcrumb', 'button')}
                >
                  {link.title}
                </components.Link>
              )
            }
          }).filter(Boolean)}
          <ToggleThemeButton />

          {isSearchEnabled && <Search block={block} title={null} />}
        </FloatingNav>
      </div>
    </header>
  )
}
