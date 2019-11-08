import React from 'react'
import {Elements} from 'react-stripe-elements'

import InjectedForm from './injected-form'

class Checkout extends React.Component {
  render() {
    console.log('in checkout')
    return (
      <Elements>
        <InjectedForm />
      </Elements>
    )
  }
}

export default Checkout
