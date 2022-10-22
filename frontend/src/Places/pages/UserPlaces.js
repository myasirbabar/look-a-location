import React from 'react'
import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'

const DUMMY_PLACES = [
    {
        id: "p1", 
        creator: "u1",
        title : "Faculty Of Computing and Inforation Technology - NC",
        description :"Offers a diverse knowledge in Computer Science and Related Fields",
        imageURL:'https://pucit.edu.pk/wp-content/uploads/2021/09/dap9_n-1.jpg',
        address: 'F7J8+53W, Samsani Road, Quaid-i-Azam Campus, لاہور, Lahore, پنجاب',
        location:{
            lat:31.4804833,
            lng:74.2630103,
        }
    },
    {
        id: "p2", 
        creator: "u2",
        title : "Faculty Of Computing and Inforation Technology - OC",
        description :"Offers a diverse knowledge in Computer Science and Related Fields",
        imageURL:'https://dailytimes.com.pk/assets/uploads/2022/07/29/2560px-Punjab_University-768x432.jpg',
        address: 'Katchery Road، Near Anarkali Bazar، Lahore, 54000, Pakistan',
        location:{
            lat:31.5703641,
            lng:74.3074407,
        }
    }

]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
    
    return (
        <PlaceList listPlaces = {loadedPlaces} />
    )
}

export default UserPlaces