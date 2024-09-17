import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement your search logic here
    console.log('Searching for:', searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-sm">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4"
          
        />
      </div>
    </form>
  )
}