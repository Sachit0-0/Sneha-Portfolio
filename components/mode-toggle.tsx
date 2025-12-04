"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import "@/app/globals.css"


export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  // Define new icon size
  const ICON_SIZE = "20"
  // Define new toggle container size (e.g., 40px)
  const TOGGLE_SIZE = "40px"
  // Define new offset for icon positioning
  const ICON_OFFSET = "10px" // (40px - 20px) / 2 = 10px

  return (
    <div className="container">
      <label className="toggle " htmlFor="switch">
        <input
          type="checkbox"
          className="input"
          id="switch"
          checked={isDark}
          onChange={toggleTheme}
        />
        <div className="icon icon--moon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            // ➡️ REDUCED ICON SIZE
            width={ICON_SIZE} 
            height={ICON_SIZE}
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="icon icon--sun">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            // ➡️ REDUCED ICON SIZE
            width={ICON_SIZE} 
            height={ICON_SIZE}
          >
            <path
              d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
            ></path>
          </svg>
        </div>
        <style jsx>{`
          /* From Uiverse.io by Creatlydev */
          .toggle {
            background-color: #0101083a;
            /* ➡️ REDUCED SIZE */
            width: ${TOGGLE_SIZE}; 
            height: ${TOGGLE_SIZE};
            border-radius: 50%;
            display: grid;
            place-items: center;
            cursor: pointer;
            box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.1);
            line-height: 1;
            position: relative;
          }
          .input {
            display: none;
          }
          .icon {
            grid-column: 1 / 1;
            grid-row: 1 / 1;
            transition: transform 500ms;
            line-height: 0.1;
            position: absolute;
          }
          .icon--moon {
            /* ➡️ ADJUSTED POSITIONING */
            left: ${ICON_OFFSET}; 
            transition-delay: 200ms;
            top: ${ICON_OFFSET};
          }
          .icon--sun {
            /* ➡️ ADJUSTED POSITIONING */
            left: ${ICON_OFFSET};
            top: ${ICON_OFFSET};
            transform: scale(0);
          }
          .input:checked + .icon--moon {
            transform: rotate(360deg) scale(0);
          }
          .input:checked ~ .icon--sun {
            transition-delay: 200ms;
            transform: scale(1) rotate(360deg);
          }
        `}</style>
      </label>
    </div>
  )
}