import React from 'react'
import "../styling/components/NameHeader.css";

function NameHeader() {
  return (
    <table class="name-header-table">
      <tbody>
        <td>
          <img className='profile-img' src="./logo512.png" alt="" />
        </td>
        <td>
          <tr><span style={{ fontFamily: "Helvetica-Bold" }} className='name-td'>Emmanouil</span></tr>
          <tr>
            <span style={{ fontFamily: "Helvetica-Bold" }} className='name-td'>Demosthenous</span>
            <span style={{ color: "red", fontWeight: "bold" }}>.</span>
          </tr>
        </td>
      </tbody>
    </table>
  )
}

export default NameHeader