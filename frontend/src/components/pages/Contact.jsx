import React from 'react'
import Layout from '../layout/Layout'
import { CgMail } from "react-icons/cg";
import { FiPhoneCall } from "react-icons/fi";
import { RiCustomerServiceFill } from "react-icons/ri";

const Contact = () => {
  return (
    <Layout>
      <div className="row m-0 p-0">
        <div className="col-md-6">
          <div className="contactus_left">
            <div>
            <img src="https://www.a1callcenter.com/blog/wp-content/uploads/2023/08/Taking-Customer-Care-Beyond-What-Competitors-Offer-720x380.png" alt="contactus" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
           <div className="contactus_left">
            <div>
            <h1>CONTACT US</h1>
            <p>any quert and info about product feel free to call anytime <br />we 24x7 avialable</p>
            <p><CgMail /> :www.help@ecommarceapp.com</p>
            <p><FiPhoneCall /> : 1800-040-12345</p>
            <p><RiCustomerServiceFill /> : 9911550000 (toll free)</p>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
