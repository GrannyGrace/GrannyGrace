import React from 'react'
import {CardElement} from 'react-stripe-elements'

class AddressSection extends React.Component {
  render() {
    return (
      <label>
        Address details
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
    )
  }
}

export default AddressSection
