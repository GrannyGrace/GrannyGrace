/* eslint-disable react/display-name */
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/cur-product'
import {Link, withRouter} from 'react-router-dom'

const UpdateSingleProduct = class extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      imageUrl: ''
    }
  }
  render() {
    return (
      <>
        <h2>Update:</h2>
      </>
    )
  }
}
