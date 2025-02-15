// src/components/Header/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Import the CSS module
import ProfileMenu from './ProfileMenu';


function Header() {
  return (
    <header className="flex relative bg-white bg-blend-hue p-1 shadow-sm border border-t-purple-500 mb-1 rounded-r-none rounded-md text-slate-700 transition-all border-gray-200 border-b-2 border-b-purple-400 rounded-bl-3xl rounded-tl-xl">
      <div className="mx-auto w-full px-2">
            <div className="flex h-16 items-center justify-between">
              <div className="flex-1 md:flex md:items-center md:gap-12">
                
                <div className="relative">
          <label htmlFor="Search" className="sr-only"> Search </label>

          <input
            type="text"
            id="Search"
            // placeholder="AWB No. / LR No. ..."
            placeholder="Voucher Code / Membership code..."
            className="w-96 px-2 rounded-md border-slate-200 text-lg font-semibold py-2 pe-10 shadow-inner border-2 sm:text-sm focus:border-slate-100"
          />

          <span className="absolute inset-y-0 h-full end-0 max-h-full grid place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700 bg-indigo-400 border-none rounded-none btnsearch" style={{borderRadius:'0 5px 5px 0'}}>
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                color='white'
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        
        </div>
      </div>

      <div className="md:flex md:items-center md:gap-12">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <div className='flex items-center justify-center relative mr-5'>
                <i className="ri-notification-2-fill text-2xl text-slate-500"></i>
              </div>
            </li>
          </ul>
        </nav>

        < ProfileMenu />

        <div className="block md:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
    </header>
  );
}

export default Header;
