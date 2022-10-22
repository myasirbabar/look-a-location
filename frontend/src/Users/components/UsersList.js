import React from 'react'
import './css/UsersList.css';
import Card from '../../Shared/components/UIElements/Card';
import UsersItem from './UsersItem';

const UsersList = ({listUsers}) => {
  if(listUsers.length === 0){
    return (<div className='center'><Card><h2>No Users Exists</h2></Card></div>)
  }

  return (
    <ul className='users-list'>
        {
            listUsers.map(u =>(<UsersItem key={u.id} user = {u} />))
        }
    </ul>
  )
}

export default UsersList;