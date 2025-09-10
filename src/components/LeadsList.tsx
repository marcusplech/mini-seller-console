import React from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Lead, StatusFilter, SortBy } from '../types'
import { useEffect } from 'react'

interface LeadsListProps {
  leads: Lead[]
  isLoading: boolean
  searchTerm: string
  onSearchChange: (term: string) => void
  statusFilter: StatusFilter
  onStatusFilterChange: (filter: StatusFilter) => void
  sortBy: SortBy
  onSortChange: (sort: SortBy) => void
  onLeadSelect: (lead: Lead) => void
  selectedLeadId: string | null
}

const LeadsList: React.FC<LeadsListProps> = ({
  leads,
  isLoading,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  onLeadSelect,
  selectedLeadId
}) => {
  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('leadFilters')
    if (savedFilters) {
      const { search, status, sort } = JSON.parse(savedFilters)
      if (search) onSearchChange(search)
      if (status) onStatusFilterChange(status)
      if (sort) onSortChange(sort)
    }
  }, [])

  // Save filters to localStorage when they change
  useEffect(() => {
    const filters = {
      search: searchTerm,
      status: statusFilter,
      sort: sortBy
    }
    localStorage.setItem('leadFilters', JSON.stringify(filters))
  }, [searchTerm, statusFilter, sortBy])

  const getStatusBadgeColor = (status: Lead['status']): string => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-green-100 text-green-800'
      case 'converted':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }



  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="flex space-x-4 mb-4">
              <div className="h-10 bg-gray-200 rounded flex-1"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortBy)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="score">Sort by Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div>
        {leads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No leads found</h3>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => onLeadSelect(lead)}
              className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedLeadId === lead.id.toString() ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {lead.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{lead.company}</p>
                  <p className="text-sm text-gray-600">{lead.email}</p>
                  <p className="text-sm text-gray-600">Source: {lead.source}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`text-lg font-bold ${
                    lead.score >= 90 ? 'text-green-600' : lead.score >= 75 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {lead.score}
                  </div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Results count */}
      {leads.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {leads.length} lead{leads.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}

export default LeadsList