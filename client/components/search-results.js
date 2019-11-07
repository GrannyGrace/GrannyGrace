import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSearchResult} from '../store/searchedProducts'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGripHorizontal, faList} from '@fortawesome/free-solid-svg-icons'

const SearchResults = props => {
  console.log(props)
  
  // (
  // <div className="container outer-products-container">
  //   <div className="row">
  //     <div className="col-md-4 col-sm-12 product-filters-outer-container">
  //       <span className="product-filters-inner-title">Product Filters</span>
  //       <div className="product-filters-inner-container">Category</div>
  //       {/* <ProductFilter/> */}
  //     </div>
  //     <div className="col-md-8 col-sm-12">
  //       <div className="toggle-product-styles">
  //         <div className="dropdown">
  //           <button
  //             className="btn btn-secondary dropdown-toggle"
  //             type="button"
  //             id="dropdownMenuButton"
  //             data-toggle="dropdown"
  //             aria-haspopup="true"
  //             aria-expanded="false"
  //           >
  //             Default Sorting
  //           </button>
  //           <div
  //             className="dropdown-menu"
  //             aria-labelledby="dropdownMenuButton"
  //           >
  //             <a className="dropdown-item" href="#">
  //               Action
  //             </a>
  //           </div>
  //         </div>
  //         <div className="grid">
  //           <FontAwesomeIcon icon={faGripHorizontal} /> Grid
  //         </div>
  //         <div className="list">
  //           <FontAwesomeIcon icon={faList} /> List
  //         </div>
  //       </div>
  //       <div id="products">
  //         <div className="inner-products-container">
  //           Products
  //           <div className="container-fluid">
  //             <div className="card-columns">
  //               {props.allProducts.map(elem => {
  //                 return (
  //                   <div key={elem.id} className="card">
  //                     <Link key={elem.id} to={`/products/${elem.id}`}>
  //                       <img className="card-img-top" src={elem.imageUrl} />
  //                       <div className="card-body">
  //                         <h4 className="card-title" style={{color: 'black'}}>
  //                           {elem.name} for {elem.price}
  //                         </h4>
  //                         <p className="card-text">{elem.decription}</p>
  //                       </div>
  //                     </Link>
  //                     <button
  //                       type="button"
  //                       onClick={evt => {
  //                         addToCart(elem.id)
  //                       }}
  //                     >
  //                       Add To Cart
  //                     </button>
  //                   </div>
  //                 )
  //               })}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // )
}

const mapStateToProps = state => {
  return {results: state.results}
}

const mapDispatchToProps = dispatch => {
  return {search: term => dispatch(fetchSearchResult(term))}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
