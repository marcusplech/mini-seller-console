import React from 'react'
import { Opportunity } from '../types'

interface OpportunitiesListProps {
  opportunities: Opportunity[]
}

const OpportunitiesList: React.FC<OpportunitiesListProps> = ({ opportunities }) => {
  const getStageBadgeColor = (stage: string): string => {
    switch (stage) {
      case 'Prospecting':
        return 'bg-blue-100 text-blue-800'
      case 'Qualification':
        return 'bg-yellow-100 text-yellow-800'
      case 'Proposal':
        return 'bg-orange-100 text-orange-800'
      case 'Negotiation':
        return 'bg-purple-100 text-purple-800'
      case 'Closed Won':
        return 'bg-green-100 text-green-800'
      case 'Closed Lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (opportunities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-8 text-center text-gray-500">
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-lg font-medium mb-1">No opportunities yet</p>
          <p className="text-sm">Convert leads to create opportunities</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">
          Opportunities ({opportunities.length})
        </h3>
      </div>

      {/* Opportunities List */}
      <div className="divide-y divide-gray-200">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {opportunity.name}
                  </h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStageBadgeColor(opportunity.stage)
                  }`}>
                    {opportunity.stage}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Account: {opportunity.company}
                </p>
                {opportunity.value && (
                  <p className="text-sm text-green-600 font-medium">
                    ${opportunity.value.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end text-xs text-gray-500">
                <span>ID: {opportunity.id}</span>
                {opportunity.leadId && (
                  <span className="mt-1">From Lead: {opportunity.leadId}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Total Opportunities: {opportunities.length}
          </span>
          <span className="text-gray-600">
            Total Value: ${
              opportunities
                .filter(opp => opp.value)
                .reduce((sum, opp) => sum + opp.value, 0)
                .toLocaleString()
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default OpportunitiesList