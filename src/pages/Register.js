import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import PageHeader from '../components/PageHeader/PageHeader'
import RegisterP from '../components/RegisterP/RegisterP'

const Register = () => {
  return (<React.Fragment>
    <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://res.cloudinary.com/dpi44zxlw/image/upload/v1655481712/logo_cu3hyc.png"></link>
        <title>Tec | Register</title>
    </Helmet>
    <Navbar />
    <PageHeader 
        home={`Home`}
        page={`Register`}
      />
    <RegisterP />
    <Footer />
  </React.Fragment>)
}

export default Register