import React, { useEffect, useState } from 'react'
import _ from "lodash";

const Todo = () => {
    const [table, setTable] = useState([])
    const [search,setSearch] = useState("")
    const [paginationPosts,setpaginationPosts] = useState([])
    const [currentpage,setCurrentpage] = useState(1)
    const pageSize = 10;
    const showData = async () =>{
        try{
            const req = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            const res = await req.json()
            setTable(res) 
            setpaginationPosts(_(res).slice(0).take(pageSize).value());
        }catch (e){
            console.log(e)
        } 
    }
    useEffect((e)=>{
        showData()
    },[])

    const pageCount = table ? Math.ceil(table.length/pageSize) : 0;
    if(pageCount === 1) return null;
    const pages = _.range(1,pageCount+1)

    
    const paginationNo = (pageNo)=>{
        setCurrentpage(pageNo)
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(table).slice(startIndex).take(pageSize).value()
        setpaginationPosts(paginatedPost)
    }

    let td_data =  paginationPosts.filter(el=> {
        if(search === ""){
            return el
        }else if(el.name.toLowerCase().includes(search.toLowerCase())){
            return el
        }else if(el.id.toLowerCase().includes(search.toLowerCase())){
            return el
        }else if(el.email.toLowerCase().includes(search.toLowerCase())){
            return el
        }else if(el.role.toLowerCase().includes(search.toLowerCase())){
            return el
        }
    }).map((el)=>{
        return(
            <tr key={el.id}> 
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.role}</td>
                <td><button className='btn btn-success'>Edit</button></td>
                <td><button className='btn btn-danger'>Remove</button></td>
            </tr>
        )
    })
    console.log(paginationPosts)
    console.log(table)
  return (
     <>
     <div className='container'>
         <h1>Admin UI</h1>
         <hr style={{height:"5px",color:"black"}} />
         <br />
         <input className='form-control' type="text" placeholder='Search by name id email role' onChange={(e)=>{setSearch(e.target.value)}} />
         <br />
         <table className='table'>
             <thead>
                 <tr>
                     <th>ID</th>
                     <th>NAME</th>
                     <th>EMAIL</th>
                     <th>ROLE</th>
                     <th>EDIT</th>
                     <th>REMOVE</th>
                 </tr>
             </thead>
             <tbody>
                 {td_data}
             </tbody>
         </table>
         <nav className='d-flex justify-content-center'>
             <ul className='pagination'>
                 {
                     pages.map((page)=>(
                        <li className={
                            page === currentpage ? "page-item active":"page-item" }>
                            <p className='page-link' onClick={()=>paginationNo(page)}>{page}</p>
                        </li>
                     ))
                 }  
             </ul>
         </nav>
     </div>  
     </>
  )
} 
export default Todo