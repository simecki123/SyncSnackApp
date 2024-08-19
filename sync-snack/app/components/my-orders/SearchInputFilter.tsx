'use client'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useEffect, useState, useCallback } from "react"
import { debounce } from 'lodash'

export default function DebouncedSearch() {
  const [inputValue, setInputValue] = useState('')

  const debouncedLog = useCallback(
    debounce((value: string) => {
      console.log('input value:', value)
    }, 700),
    []
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    debouncedLog(newValue)
  }

  useEffect(() => {
    return () => {
      debouncedLog.cancel()
    }
  }, [debouncedLog])

  return (
    <div className="relative mb-6 flex">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <MagnifyingGlassIcon className='size-4' />
        </div>
        <input
          type="text"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 
          focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <select
        className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm
        rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5">
        <option value="all-orders">All</option>
        <option value="option1">Completed</option>
        <option value="option2">In Progress</option>
        <option value="option3">Canceled</option>
      </select>
    </div>
  )
}
