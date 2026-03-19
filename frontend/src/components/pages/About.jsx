import React from 'react'
import Layout from '../layout/Layout'
import { CgMail } from "react-icons/cg";
import { FiPhoneCall } from "react-icons/fi";
import { RiCustomerServiceFill } from "react-icons/ri";

const About = () => {
  return (
    <Layout title={'About Us Ecommarce'}>
        <>
        <div className="row m-0 p-0">
        <div className="col-md-6">
          <div className="contactus_left">
            <div>
            <img src="https://static.vecteezy.com/system/resources/previews/007/932/867/non_2x/about-us-button-about-us-text-template-for-website-about-us-icon-flat-style-vector.jpg" alt="contactus" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
           <div className="contactus_left">
            <div>
           <p style={{width:'500px'}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>

            </div>
          </div>
        </div>
      </div>
        </>
    </Layout>
  )
}

export default About
