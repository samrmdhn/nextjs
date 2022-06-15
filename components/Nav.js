import Link from "next/link";
import Cookie from 'js-cookie';
import Router from 'next/router'

export default function Nav() {

    const logoutHandler = (e) =>{
        e.preventDefault();
        Cookie.remove('token');
        Router.replace('/auth/login');
    }

  return (
    <div>
      <h3>Nav</h3>
      <div>
        <Link href="/posts/"><a>Posts</a></Link>
        &nbsp; | &nbsp;
        <Link href="/posts/create"><a>Create post</a></Link>
        &nbsp; | &nbsp;
        <a href="" onClick={logoutHandler}>Logout</a>
      </div>
      
    </div>
  );
}
