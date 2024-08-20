'use client'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useEffect, useState, useCallback } from "react"
import { debounce } from 'lodash'
import { useRouter } from "next/navigation"

export default function SearchInputFilter({ setInput, setStatusFilter }: any) {
  const [inputValue, setInputValue] = useState('')

  const debouncedLog = useCallback(
    debounce((value: string) => {
      setInput(value)
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

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
    console.log('changing the select: ', event.target.value)
    setStatusFilter(event.target.value)
  }

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
        onChange={handleSelectChange}
        className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm
        rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5">
        <option value="">All</option>
        <option value="COMPLETED">Completed</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="CANCELLED">Canceled</option>
      </select>
    </div>
  )
}
