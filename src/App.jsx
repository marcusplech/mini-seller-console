import { useState, useEffect } from 'react'
import LeadsList from './components/LeadsList'
import LeadDetailPanel from './components/LeadDetailPanel'
import OpportunitiesList from './components/OpportunitiesList'
import leadsData from './data/leads.json'


function App() {
  const [leads, setLeads] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [selectedLead, setSelectedLead] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('score')

  // Load leads data with simulated latency
  useEffect(() => {
    const loadLeads = async () => {
      try {
        setIsLoading(true)
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLeads(leadsData)
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to load leads data')
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

  const handleLeadSelect = (lead) => {
    setSelectedLead(lead)
  }

  const handleLeadUpdate = async (updatedLead) => {
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
      return { success: false, error: err.message || 'Failed to update lead' }
    }
  }

  const handleConvertToOpportunity = async (lead) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const opportunity = {
        id: Date.now(),
        name: `${lead.company} - ${lead.name}`,
        stage: 'Prospecting',
        amount: null,
        accountName: lead.company,
        leadId: lead.id
      }
      
      setOpportunities(prev => [...prev, opportunity])
      
      // Update lead status to converted
      const updatedLead = { ...lead, status: 'converted' }
      setLeads(prevLeads => 
        prevLeads.map(l => l.id === lead.id ? updatedLead : l)
      )
      
      setSelectedLead(null)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'Failed to convert lead' }
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
