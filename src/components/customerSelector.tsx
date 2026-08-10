import type { Customer } from '../types'

type CustomerSelectorProps = {
  customers: Customer[]
  selectedCustomerId: string
  onCustomerChange: (customerId: string) => void
}

function CustomerSelector({
  customers,
  selectedCustomerId,
  onCustomerChange,
}: CustomerSelectorProps) {
  return (
    <section>
      <h2>Select Customer</h2>

      <select
        value={selectedCustomerId}
        onChange={(event) => onCustomerChange(event.target.value)}
      >
        <option value="">Choose a customer</option>

        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </section>
  )
}

export default CustomerSelector