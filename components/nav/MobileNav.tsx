'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import type { NavLink } from '@/types'

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — rendered at body level to escape header stacking context */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-54 bg-surface border-l border-border z-[101] flex flex-col p-6"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="self-end mb-8 p-2 text-text hover:text-accent transition-colors"
            >
              <X size={22} />
            </button>

            <nav>
              <ul className="flex flex-col gap-6">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="text-xl font-medium text-text hover:text-accent transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="group pb-4 pl-2 text-text hover:text-accent transition-colors"
      >
        <div className="flex flex-col gap-[5px] w-[18px]">
          <span className="block h-[2px] w-full bg-current" />
          <span className="block h-[2px] w-[13px] bg-current ml-auto transition-[width] duration-300 ease-in-out group-hover:w-full" />
          <span className="block h-[2px] w-[8px] bg-current ml-auto transition-[width] duration-300 ease-in-out group-hover:w-full" />
        </div>
      </button>

      {typeof document !== 'undefined' && createPortal(overlay, document.body)}
    </div>
  )
}
