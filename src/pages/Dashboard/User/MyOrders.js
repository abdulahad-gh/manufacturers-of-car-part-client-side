import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase-init";
import Spinner from "../../Shared/Spinner";
import axios from "axios";


const MyOrders = () => {
    const [spinner, setSpinner] = useState(true);
    const [data, setData] = useState([]);
    const [user, loading] = useAuthState(auth);



useEffect(()=>{
    fetch(`https://fair-gold-bull-tam.cyclic.app/order/${user.email}`)
    .then(res => res.json())
    .then(res =>{
        setSpinner(false)
        setData(res.payload)
    })
},[user.email])



  const handleDelete = (id, name) => {
  axios.delete(`https://fair-gold-bull-tam.cyclic.app/order/${id}`)
  .then(res =>{
    const newData =  data.filter(item => item._id !== id)
    console.log(newData)
    setData(newData)
    toast.success(`successfully deleted ${name} part from collection list. `)
  })
  .catch(err => {
    console.log('err',err)
  })
}

if(spinner || loading){
    return <Spinner/>
}
    
 
      

  return (
    <div className="mt-10 px-2 lg:px-5 bg-gray-200 rounded-md p-4">
      <h1 className="text-c enter text-2xl">My Orders</h1>
  
    <div className="overflow-x-auto mt-5">
    <table className="table w-full">
      <thead>
        <tr>
          <th></th>
          <th>Image</th>
          <th>Item</th>
          <th>Email</th>
          <th>Price</th>
          <th>Payment</th>
          <th>Remove Order</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((order, i) => (
          <>
            <tr key={i}>
              <th>{i + 1}</th>
              <td>
                <div className="avatar">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={order?.img} alt={order?.part} />
                  </div>
                </div>
              </td>
              <td>{order?.partName}</td>
              <td>{order?.email}</td>
              <td>{order?.price}</td>
              <td>
                {order.price && !order.paid && (
                  <Link to={`/dashboard/payment/${order?._id}`}>
                    <button className="btn btn-xs btn-primary">pay</button>
                  </Link>
                )}
                {order.price && order.paid && (
                  <div>
                    <p>
                      <span className="text-success">Paid</span>
                    </p>
                    <p>
                      Transaction id:{" "}
                      <span className="text-success">
                        {order.transactionId}
                      </span>
                    </p>
                  </div>
                )}
              </td>
              {order?.price && !order?.paid ? (
                <td>
                  <label
                    for="delete-order"
                    className="btn  btn-xs btn-error"
                  >
                    Delete
                  </label>

                  <input
                    type="checkbox"
                    id="delete-order"
                    className="modal-toggle"
                  />
                  <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        are you sure deleted{" "}
                        <span className="text-red-500 font-bold">
                          {order.partName}
                        </span>{" "}
                        order?
                      </h3>
                      <p className="py-4">
                        remember! if you delete. after you again add It{" "}
                      </p>
                      <div className="modal-action">
                        <label
                          onClick={() =>
                            handleDelete(order?._id, order?.partName)
                          }
                          for="delete-order"
                          className="btn btn-xs btn-error"
                        >
                          Delete
                        </label>
                        <label
                          for="delete-order"
                          className="btn btn-xs btn-info"
                        >
                          Cancel
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  </div>
    
    
    </div>
  );
};

export default MyOrders;
