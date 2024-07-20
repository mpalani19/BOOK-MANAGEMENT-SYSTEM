const express=require("express")
const {users}=require("../data/users.json");
const router=express.Router();

/**
*route: /users
*method:get
*descriptions: get all users
*access:Public
*parameter:None
*/

router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data:users
    })
})

/**
*route: /users/:id
*method:get
*descriptions: get all users by their id
*access:Public
*parameter:id
*/

router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const user=users.find((each)=> each.id === id);
    if (!user){
        res.status(404).json({
            success:false,
            message:"User Not Found For The Given Id"
        })
    }
    return res.status(200).json({
        success:true,
        data:user
    })
})

/**
*route: /users
*method:post
*descriptions: create new user
*access:Public
*parameter:None
*/

router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType, subscriptionDate} = req.body;
    const user=users.find((each)=>each.id===id);
    if (user){
        return res.status(404).json({
            success:false,
            message:"User with the given Id exist"
        })
    }
    users.push(
        {id,name,surname,email,subscriptionType, subscriptionDate
        })
        return res.status(201).json({
            success: true,
            data: users
        })
})

/**
*route: /users/:id
*method:put
*descriptions: update user by their ID
*access:Public
*parameter: ID
*/

router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found For The Given Id :-("
        })
    }

    const updateUser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updateUser
    })

})

/**
*route: /users/:id
*method:Delete
*descriptions: Delete a user by their id
*access:Public
*parameter:id
*/

router.delete("/:id",(req,res)=>{
    const {id} = req.params;

    const user=users.find((each)=> each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found for the given id"
        })
    }
    const index = users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json({
        success:true,
        data: users
    })
})

module.exports=router;