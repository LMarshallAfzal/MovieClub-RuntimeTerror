import React from 'react'
import Image from 'react-bootstrap/Image';
import "../styling/components/NameHeader.css";

function NameHeader() {
  return (
    <table class="name-header-table">
      <tbody>
        <td>
          <img className='profile-img' src="./logo512.png" alt="" />
        </td>
        <td>
          <tr><div style={{ fontFamily: "Helvetica-Bold" }} className='name-td'>Emmanouil</div></tr>
          <tr><div style={{ fontFamily: "Helvetica-Bold" }} className='name-td'>Demosthenous</div></tr>
        </td>
      </tbody>
    </table>
  )
}

export default NameHeader
