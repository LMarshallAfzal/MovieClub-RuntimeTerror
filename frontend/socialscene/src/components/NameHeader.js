import React from 'react'
import Image from 'react-bootstrap/Image';

function NameHeader() {
  return (
    <table class="table">
      <tbody>
          <td>
          <img src="./logo512.png" class="img-fluid img-thumbnail" alt="" />
          </td>
          <td>Noah Cheeseman</td>
      </tbody>
    </table>
  )
}

export default NameHeader