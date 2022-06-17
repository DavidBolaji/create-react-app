import { BackTop, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet';
import { IoIosArrowUp } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import GetConnected from '../components/GetConnected/GetConnected';
import MailingList from '../components/MailingList/MailingList';
import Navbar from '../components/Navbar/Navbar';
import { Blog } from '../utils/apiLists';
import PageHeader from '../components/PageHeader/PageHeader';
import BlogSin from '../components/BlogSin/BlogSin';

const BlogSingle = () => {
  const { blogId } = useParams();
  const [data, setData] = useState({});
  const [blogs, setBlogs] = useState([]);
  let url = `${Blog.findOne(blogId)}`;
  url = `https://tec-server-api.herokuapp.com/api/v1/${url}`;

  const rerender = async (id) => {
    const url = `${Blog.findOne(id)}`;
    const URL = `https://tec-server-api.herokuapp.com/api/v1/${url}`;
   
    const res = await fetch(URL, {
    method: 'GET',
    headers: {
       'Content-Type': 'application/json',
    }
    })

    const result = await res.json()
    setData({...result});
}

  const getBlogs = async () => {
    const url = `https://tec-server-api.herokuapp.com/api/v1/${Blog.find}`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
        }
    })

    const result = await res.json()

    return result
  }

useEffect(() => {
    getBlogs().then(blog => {
        setBlogs([...blog.blogs])
        // setLoading(false);
    })
  
},[])
  const getSingleBlog = async () => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
  })

  const result = await res.json()

  return result
  }
  useEffect(() => {
    getSingleBlog().then(res => {
      console.log(res.title);
      setData({...res});
    });
  }, [])
  return data.title ? (
    <React.Fragment>
    <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://res.cloudinary.com/dpi44zxlw/image/upload/v1655481712/logo_cu3hyc.png"></link>
        <title>Tec | {`${data.title}`}</title>
    </Helmet>
    <Navbar />
    <PageHeader 
      home={`Blog`}
      page={`${data.title}`}
    />
   
    <BlogSin blogs={blogs} rerenderHead={rerender}/>
    
   
    <MailingList />
    <GetConnected />
    <BackTop>
      <div style={{
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: '#1088e9',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
      }}><IoIosArrowUp /></div>
    </BackTop>
    <Footer />
  </React.Fragment>
  ) : <Spin />
}

export default BlogSingle