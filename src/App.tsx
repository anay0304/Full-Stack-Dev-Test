import { useState } from 'react'
import customersData from './data/customers.json'
import { normalizeCustomer } from './utils/normalizeData'
import CustomerSelector from './components/customerSelector'
import CustomerDetails from './components/customerDetails'
import './App.css'

const customers = customersData.map(normalizeCustomer)

function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState('')

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId
  )

  return (
    <main className="app">
      <h1>Field Estimate Tool</h1>

      <CustomerSelector
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        onCustomerChange={setSelectedCustomerId}
      />

      {selectedCustomer && (
        <CustomerDetails customer={selectedCustomer} />
      )}
    </main>
  )
}

export default App