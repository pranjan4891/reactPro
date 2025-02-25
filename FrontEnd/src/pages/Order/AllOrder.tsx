import React, { FC } from "react";
import styles from './order.module.css';
import {adminRoutes} from '../../utils/constants/routes';
import { json } from "stream/consumers";

const AllOrder: FC = () => {
  return (
    <div className="py-2 flex flex-1 h-full flex-col overflow-hidden">
      <div className="tab-list">
        <div>
          <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">
              Tab
            </label>

            <select id="Tab" className="w-full rounded-md border-gray-200">
              <option>Ready to Ship</option>
              <option>Ready to Pickup</option>
              <option>In Transit</option>
              <option>RTO in Transit</option>
              <option>Delivered</option>
              <option>All Shipments</option>
            </select>
          </div>

          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
            
              <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 pb-2 text-sm font-medium text-gray-900 hover:border-gray-500 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>
                  Ready to Ship
                </a>

                <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 pb-2 text-sm font-medium text-gray-900 hover:border-gray-500 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                  Ready to Pickup
                </a>

                <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 pb-2 text-sm font-medium text-gray-900 hover:border-gray-500 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  In Transit
                </a>

                <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-purple-500 px-1 pb-2 text-sm font-medium text-purple-600"
                  aria-current="page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  RTO in Transit
                </a>

                <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 pb-2 text-sm font-medium text-gray-900 hover:border-gray-500 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                  Delivered
                </a>

                <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 pb-2 text-sm font-medium text-gray-900 hover:border-gray-500 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                    />
                  </svg>
                  All Shipments
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-cntnt flex flex-col h-full bg-gray-100 shadow-inner rounded-sm z-0 border overflow-hidden">
        {/* <div className="bg-gray-400">header</div> */}
        <div className="flex px-2 p-1 justify-between items-center w-full">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-800">
              <li className="flex items-center">
                <a
                  href="#"
                  className="flex h-10 items-center gap-1.5 bg-white px-4 transition hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>

                  <span className="ms-1.5 text-sm font-medium"> Orders </span>
                </a>
              </li>

              <li className="relative flex items-center">
                <span className="absolute inset-y-0 -start-px h-10 w-4 bg-white [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

                <span className="flex h-10 items-center bg-slate-100 text-slate-500 pe-4 ps-8 text-sm font-medium transition">
                  Ready to Ship
                </span>
              </li>
            </ol>
          </nav>
          <div className="flex gap-4">
            {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

            <div className="relative">
              <label htmlFor="Search" className="sr-only">
                {" "}
                Search{" "}
              </label>

              <input
                type="text"
                id="Search"
                height={10}
                placeholder="Search for..."
                className={`${styles.input} w-full rounded-md border-gray-200 py-2 pe-16 shadow-sm sm:text-sm min-w-72`} 
              />

              {/* <span className="absolute inset-y-0 top-0 h-10 border-l right-0 border-l-gray-400 end-0 grid w-10 place-content-center bg-gray-400"> */}
                <button
                  type="button"
                  style={{top: '1px', right: '1px', borderRadius: '0 5px 5px 0', borderBottom: '1px', height: 'calc(100% - 4px)'}}
                  className="absolute text-gray-600 bg-slate-300 h-full rounded-l-sm hover:none hover:text-gray-700 top-0 px-3 right-0"
                >
                  <span className="sr-only">Search</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              {/* </span> */}
            </div>

            <div className="inline-flex gap-2">
              {/* <a href="#" className="h-10 px-5 flex items-center bg-slate-200 border border-slate-300 shadow-sm rounded-md text-slate-600 text-sm">Add New Order</a> */}
              {/* <a href="#" className="h-10 px-5 flex items-center bg-indigo-500 shadow-sm rounded-md text-gray-50 hover:text-indigo-100 hover:bg-indigo-600 text-sm">Add New Order</a>
              <a href="#" className="h-10 px-5 flex items-center bg-blue-300 shadow-sm rounded-md text-blue-800 hover:text-blue-100 hover:bg-blue-600 text-sm">Bulk Order</a>
              <a href="#" className="h-10 px-5 flex items-center bg-green-300 mr-1 shadow-sm rounded-md text-green-8.0 hover:text-green-100 hover:bg-green-600 text-sm">Export</a> */}
              <a href="#" className="h-10 px-5 flex items-center bg-cyan-500 shadow-sm rounded-md text-white hover:bg-cyan-600 text-sm">Add New Order</a>
              <a href="#" className="h-10 px-5 flex items-center bg-purple-200 shadow-sm rounded-md hover:text-purple-500 hover:bg-purple-300 text-sm">Bulk Order</a>
              <a href="#" className="h-10 px-5 flex items-center border-gray-400 bg-gray-300 mr-1 shadow-sm rounded-md text-gray-500 hover:text-gray-100 hover:bg-gray-400 text-sm">Export</a>
            </div>
            
             
            
          </div>
        </div>
        <div className="flex-1 p-2 pt-1 pb-1 overflow-hidden">
          <div className="flex flex-col h-full max-h-full overflow-y-auto w-full">
            <div
              className="flex-1 overflow-x-auto overflow-y-auto max-h-full bg-white h-full rounded-sm [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 scroll-smooth"
            >
              <table className="min-w-full divide-y-2 divide-gray-200 rounded-sm bg-white text-gray-200 text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="sticky top-0 bg-white whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Name
                    </th>
                    <th className="sticky top-0 bg-white whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Date of Birth
                    </th>
                    <th className="sticky top-0 bg-white whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Role
                    </th>
                    <th className="sticky top-0 bg-white whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Salary
                    </th>
                    <th className="sticky top-0 bg-white px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      John Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Developer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $120,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Jane Doe
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      04/11/1980
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Web Designer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $100,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Gary Barlow
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      24/05/1995
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Singer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $20,000
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        href="#"
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white p-2 divide-x border-t-gray-800">
              footer table
            </div>
          </div>
        </div>
        {/* <div className="bg-white">footer</div> */}
      </div>
    </div>
  );
};

export default AllOrder;
