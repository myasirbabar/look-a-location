import React from 'react'
import Card from '../../Shared/components/UIElements/Card'
import PlaceItem from './PlaceItem'
import Button from '../../Shared/components/FormElements/Button'
import './PlaceList.css'

const PlaceList = ({listPlaces}) => {
    if(listPlaces.length === 0){
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No PLace Exist... May be Create One</h2>
                    <Button inverse>Create Place</Button>
                </Card>
            </div>
        )
    }
    else{
        return(
            <ul className='place-list'>
                {listPlaces.map(p =>{
                    return (<PlaceItem key={p.id} place = {p} />)
                })}
            </ul>
        )
    }
}

export default PlaceList