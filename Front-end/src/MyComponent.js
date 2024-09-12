import React from 'react'
const MyComponent = () => {
  const mystyle={
    backgroundImage:
    "url('https://thumbs.dreamstime.com/z/budget-background-financial-concept-note-book-money-calculator-66275030.jpg')",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    height:"100vh",
  };
  return (
    <div style={mystyle}>
    <div className=' w-75 h-100 mx-auto '>
      <div className='items d-flex justify-content-left first-section mx-5'>
        <div className='mx-4'><h6>ITEM DESCRIPTION</h6>
          <hr></hr>
          <p className='pb-2'>Food</p>
          <p >Travel</p>
          <p className='pt-1'>Shopping</p>
          <p className='pt-2'>Bikes</p>
          <p className='pt-2'>Books</p>
        </div>
        <hr></hr>
        
        <div className='mx-5'>
          <div className='mx-4'><h6>Total</h6>
            <hr></hr>
            <p>$20</p>
            <p className='pt-2'>$20</p>
            <p className='pt-1'>$20</p>
            <p className='pt-2'>$20</p>
            <p className='pt-2'>$20</p>
          </div>
        </div>
      </div>
      
      <div className='d-flex foot  justify-content-left mx-5' >
          <div className='total ' >
          <div className='mx-4 d-flex pt-2'><h6>SUBTOTAL</h6>
            <p className='mx-4'>$567</p>
          </div>
          <div className='mx-4 d-flex pt-2 '><h6>TAX</h6>
            <p className='mx-4 px-4'>$876</p>
          </div>
          <div className='mx-4 d-flex pt-2'><h6>TOTAL</h6>
            <p className='mx-4'>$347</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MyComponent