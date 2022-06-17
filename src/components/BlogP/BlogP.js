import { Avatar, Button, Card, Skeleton,Form, Input, Checkbox, Space, Pagination, Spin  } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Blog } from '../../utils/apiLists';
import { truncate } from '../../utils/truncate';
import BlogS from '../BlogS/BlogS';
import "./BlogP.css";


const BlogP = () => {
    const [loading, setLoading] = useState(true);
    const [screen, setScreen] = useState(window.screen.width);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(null);
    const history = useHistory();
    const location = useLocation();

    const getBlogs = async () => {
        let url = `https://tec-server-api.herokuapp.com/api/v1/${Blog.find}`;
        if(location.search !== "") {
            url = `https://tec-server-api.herokuapp.com/api/v1/${Blog.find}${location.search}`;
        } 

    
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
            console.log(blog);
            setTotal(blog.total)
            setBlogs([...blog.blogs])
            setLoading(false);
        })
      
    },[]);

    

    
  
    useEffect(() => {
      const checkResize = (e) => {
        setScreen(window.screen.width);
      }
  
      window.addEventListener('resize', checkResize);
  
      return () => window.removeEventListener('resize', checkResize);
    }, [])



    const handleClick = (id) => {
        console.log('hello');
        history.push(`/blog/${id}`)
    }

    const onChange = async (pageNumber) => {
        let url;
        pageNumber === 1 ? url = `https://tec-server-api.herokuapp.com/api/v1/${Blog.find}?skip=${pageNumber - 1}` :
        url = `https://tec-server-api.herokuapp.com/api/v1/${Blog.find}?skip=${pageNumber}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            }
        })
    
        const result = await res.json()
        console.log(result);
        
        setTotal(result.total)
        setBlogs([...result.blogs])
        // setLoading(false);
       
      }

    const renderPosts = blogs.map(blog => {
        return(
            <Card
            key={blog._id}
            data-aos="flip-right"
            data-aos-easing="linear"
            data-aos-duration="500"
            style={{ minWidth: 280, width: screen > 990 ? 240 : screen-40,  marginTop: 16, marginLeft: 5 }}
            hoverable
            cover={<img alt="example" src={blog.img} />}
            >
                <Skeleton loading={loading} avatar active
                
                style={{
                    width: 'auto',
                    minWidth: 200,
                    height: 'auto'
                }}
                >
                    <Meta
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={blog.title}
                    description={truncate(blog.content, 5)}
                    />
                    <Button type='link' onClick={handleClick.bind(null,blog._id)}>more</Button>
                </Skeleton>
            </Card>
        )
    })
    // style={{
    //     display: 'block',
    //     flex: 1,
    //     width: '100%'
    // }}

  return (
    <>
    <div
    style={{
        width: '100%',
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ededed'
    }}
    >
        <Pagination
        style={{
            zIndex: 7
        }}
        onChange={onChange}
        defaultCurrent={1}
        defaultPageSize={6}
        total={total}
        />
    </div>
    {blogs.length === 0 ? <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}><Spin /></div> : <div className='blog__page'>
        <div className='blog__page__blog'>
            {renderPosts}
        </div>
        <BlogS />
    </div>}
    
    </>
  )
}

export default BlogP;