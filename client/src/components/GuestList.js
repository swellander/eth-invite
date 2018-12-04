import React from 'react';

export default ({ guests }) => {
  return (
    <div>
      {
        guests && guests.map(guest => {
          return (
            <div>
              <p>{guest.name}</p>
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}