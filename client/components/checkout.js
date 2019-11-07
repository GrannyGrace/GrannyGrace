import React from 'react'
import {Elements} from 'react-stripe-elements'

import InjectedStripe from './injected-stripe'

class MyStoreCheckout extends React.Component {
  render() {
    console.log('in checkout')
    return (
      <Elements>
        <InjectedStripe />
      </Elements>
    )
  }
}

export default MyStoreCheckout
