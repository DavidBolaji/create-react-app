import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer/Footer.js';
import GalleryP from '../components/Gallery/GalleryP.js';
import Navbar from '../components/Navbar/Navbar.js';
import PageHeader from '../components/PageHeader/PageHeader.js';

const Login = () => {

  return (<React.Fragment>
    <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://res.cloudinary.com/dpi44zxlw/image/upload/v1655481712/logo_cu3hyc.png"></link>
        <title>Tec | Gallery</title>
    </Helmet>
    <Navbar />
    <PageHeader 
        home={`Home`}
        page={`Gallery`}
      />
    <div style={{
        margin: 50,
        
    }}>
        <GalleryP />
    </div>
    <Footer />
  </React.Fragment>)
}

export default Login