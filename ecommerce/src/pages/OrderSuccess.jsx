import { Link } from "react-router-dom"

export default function OrderSuccess (){



    return (
      <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-20">
            Thankyou your order has been placed.Go to <Link to={'/orders'}> <a href="#" className="text-blue-500">Orders</a></Link>
      </div>

    )
}