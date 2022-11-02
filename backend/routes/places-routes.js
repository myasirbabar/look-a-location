const express = require("express");

const router = express.Router();

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

// Get Place
router.get('/:pid', (req,res,next)=>{
	console.log("Get Places Request In Places")

	const placeId = req.params.pid;
	const place = DUMMY_PLACES.find(p => p.id === placeId);
	
	res.json({place})
})


// Get User Places
router.get('/user/:uid', (req,res,next)=>{
	console.log("Get User Places Request In Places")
	
	const userID = req.params.uid;
	const places = DUMMY_PLACES.filter(p => p.creator === userID);

	res.json({places})
})

module.exports = router;