import React, { useState } from 'react'
import './Pagination.css'

const Pagination = (props) => {

  const [activeNumber, setActiveNumber] = useState("")

  let pageNumbers = []
  for (let i = 1; i <= Math.ceil((props.filteredMeals?.length || 0) / props.mealsPerPage); i++) {
    pageNumbers.push(i)
  }
  console.log("pageNumbers", pageNumbers)

  // function to change the current page 
  function getCurrentPage(page) {
    // alert(page)   ← removed
    props.setCurrentPage(page)
    setActiveNumber(page)
  }

  let pages = pageNumbers.map((page, index) => {
    return (
      <li
        key={index}
        className={`${page === activeNumber ? "activeNumber" : ""}`}
        onClick={() => getCurrentPage(page)}
      >
        {page}
      </li>
    )
  })

  return (
    <div className="pagination">
      <ul>
        {pages}
      </ul>
    </div>
  )
}

export default Pagination
