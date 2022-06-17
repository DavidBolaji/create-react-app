import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Blog } from '../../utils/apiLists';
import "./BlogS.css";


const BlogS = ({style, rerender}) => {
    const [blogs, setBlogs] = useState([ ]);
    const history = useHistory();
    const location = useLocation();

    const getBlogs = async () => {
        let url = `https://tec-server-api.herokuapp.com/api/v1/${Blog.find}`;

        const res = await fetch(`${url}?side=true`, {
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
            setBlogs([...blog.blogs]);
        })
    }, [])
  return !blogs ? <Spin></Spin>: (
    <div className='blog__page__aside' style={style} >
            {/* <div className='blog__form__login'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                    <Input />
                    </Item>

                    <Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Item>

                    <Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                        style={{
                            textAlign: "left"
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Item>

                    <Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Item>
                </Form>
            </div> */}
            {/* <div className='blog__search'>
                <Search placeholder="input search text" onSearch={onSearch} enterButton loading={loading}/>
            </div> */}
            <div className='blog__latest_posts'>
                <h2>Recent posts</h2>
                {blogs.map(e=><div key={e._id}><a onClick={() => {
                    if(location.pathname === '/blog') {
                        console.log('enter');
                        history.push(`/blog/${e._id}`)
                    } else {
                        rerender(e._id)
                    };
                   
                }}>{e.title}</a><hr /></div>)}
            </div>

        </div>
  )
}

export default BlogS