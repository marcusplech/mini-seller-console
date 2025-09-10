import { useState, useEffect } from 'react'
import LeadsList from './components/LeadsList'
import LeadDetailPanel from './components/LeadDetailPanel'
import OpportunitiesList from './components/OpportunitiesList'
import leadsData from './data/leads.json'
import type { Lead, Opportunity, ApiResponse, StatusFilter, SortBy } from './types'


function App() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortBy, setSortBy] = useState<SortBy>('score')

  // Load leads data with simulated latency
  useEffect(() => {
    const loadLeads = async () => {
      try {
        setIsLoading(true)
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLeads(leadsData as Lead[])
        setError(null)
      } catch (err) {
        setError((err as Error).message || 'Failed to load leads data')
      } finally {
        setIsLoading(false)
      }
    }

    loadLeads()
  }, [])

  // Filter and sort leads
  const filteredLeads = leads
    .filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'score') {
        return b.score - a.score // Descending
      }
      return 0
    })

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead)
  }

  const handleLeadUpdate = async (updatedLead: Lead): Promise<ApiResponse<Lead>> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === updatedLead.id ? updatedLead : lead
        )
      )
      setSelectedLead(updatedLead)
      return { success: true }
    } catch (err) {
        return { success: false, error: (err as Error).message || 'Failed to update lead' }
    }
  }

  const handleConvertToOpportunity = async (lead: Lead): Promise<ApiResponse<Opportunity>> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newOpportunity: Opportunity = {
         id: Date.now(),
         name: `${lead.name} - ${lead.company}`,
         company: lead.company,
         stage: 'prospecting',
         value: 0,
         createdAt: new Date().toISOString(),
         leadId: lead.id
       }
      
      setOpportunities(prev => [...prev, newOpportunity])
      
      // Update lead status to converted
      const updatedLead = { ...lead, status: 'converted' as const }
      setLeads(prevLeads => 
        prevLeads.map(l => l.id === lead.id ? updatedLead : l)
      )
      
      setSelectedLead(null)
      return { success: true }
    } catch (err) {
        return { success: false, error: (err as Error).message || 'Failed to convert lead to opportunity' }
     }
   }

  const handleClosePanel = () => {
    setSelectedLead(null)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️ Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mini Seller Console</h1>
          <p className="text-gray-600">Manage your leads and convert them to opportunities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leads Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Leads</h2>
              <LeadsList
                leads={filteredLeads}
                isLoading={isLoading}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onLeadSelect={handleLeadSelect}
                selectedLeadId={selectedLead?.id}
              />
            </div>
          </div>

          {/* Opportunities Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Opportunities</h2>
            <OpportunitiesList opportunities={opportunities} />
          </div>
        </div>
      </div>

      {/* Lead Detail Panel */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={handleClosePanel}
          onUpdate={handleLeadUpdate}
          onConvert={handleConvertToOpportunity}
        />
      )}
    </div>
  )
}

export default App
