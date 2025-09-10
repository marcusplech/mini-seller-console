import React, { useState } from 'react'
import { Lead, Opportunity, ApiResponse } from '../types'

interface LeadDetailPanelProps {
  lead: Lead
  onClose: () => void
  onUpdate: (lead: Lead) => Promise<ApiResponse<Lead>>
  onConvert: (lead: Lead) => Promise<ApiResponse<Opportunity>>
}

const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({ lead, onClose, onUpdate, onConvert }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedLead, setEditedLead] = useState<Lead>(lead)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState<boolean>(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSave = async (): Promise<void> => {
    if (!validateEmail(editedLead.email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError(null)

    const result = await onUpdate(editedLead)
    
    if (result.success) {
      setIsEditing(false)
    } else {
      setError(result.error || 'Update failed')
    }
    
    setIsLoading(false)
  }

  const handleCancel = (): void => {
    setEditedLead(lead)
    setIsEditing(false)
    setError(null)
  }

  const handleConvert = async (): Promise<void> => {
    setIsConverting(true)
    setError(null)

    const result = await onConvert(lead)
    
    if (result.success) {
      // Panel will close automatically when lead is converted
    } else {
      setError(result.error || 'Conversion failed')
    }
    
    setIsConverting(false)
  }

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

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        
        {/* Panel */}
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              {/* Header */}
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-900">
                      Lead Details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {lead.name} • {lead.company}
                    </p>
                  </div>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={onClose}
                      className="bg-gray-50 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-4 py-6 sm:px-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Basic Information</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{lead.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Company</dt>
                        <dd className="mt-1 text-sm text-gray-900">{lead.company}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Source</dt>
                        <dd className="mt-1 text-sm text-gray-900">{lead.source}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Score</dt>
                        <dd className={`mt-1 text-sm font-semibold ${getScoreColor(lead.score)}`}>
                          {lead.score}/100
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Editable Fields */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-4">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editedLead.email}
                            onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-sm text-gray-900">{lead.email}</p>
                        )}
                      </div>

                      {/* Status */}
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Status
                        </label>
                        {isEditing ? (
                          <select
                            value={editedLead.status}
                            onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value as Lead['status'] })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                          </select>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getStatusBadgeColor(lead.status)
                          }`}>
                            {lead.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 py-4 bg-gray-50 sm:px-6">
                <div className="flex flex-col space-y-3">
                  {isEditing ? (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        Edit Lead
                      </button>
                      {lead.status !== 'converted' && (
                        <button
                          onClick={handleConvert}
                          disabled={isConverting}
                          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isConverting ? 'Converting...' : 'Convert to Opportunity'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LeadDetailPanel
