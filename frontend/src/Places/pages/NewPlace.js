import React from 'react'
import Input from '../../Shared/components/FormElements/Input'
import './NewPlace.css'

const NewPlace = () => {
  return (
    <form className='place-form'>
      <Input element = "input" type = "text" placeholder = "Enter Title" label = "Title" />
    </form>
  )
}

export default NewPlace;