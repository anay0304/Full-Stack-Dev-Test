import type { Customer } from '../types'

type CustomerDetailsProps = {
  customer: Customer
}

function CustomerDetails({ customer }: CustomerDetailsProps) {
  return (
    <section>
      <h2>Customer Details</h2>

      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      <p><strong>Phone:</strong> {customer.phone ?? 'Not available'}</p>
      <p><strong>Property Type:</strong> {customer.propertyType ?? 'Not available'}</p>
      <p><strong>Square Footage:</strong> {customer.squareFootage ?? 'Not available'}</p>
      <p><strong>System:</strong> {customer.systemType ?? 'Not available'}</p>
      <p><strong>System Age:</strong> {customer.systemAge ?? 'Not available'}</p>
      <p><strong>Last Service:</strong> {customer.lastServiceDate ?? 'Not available'}</p>
    </section>
  )
}

export default CustomerDetails