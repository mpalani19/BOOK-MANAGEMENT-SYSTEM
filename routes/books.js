const express=require("express")
const {books}=require("../data/books.json");
const router=express.Router();



/**
*route: /books
*method:get
*descriptions: all books available
*access:Public
*parameter:None
*/

router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data:books
    })
})

/**
*route: /books/:id
*method:get
*descriptions: get single books by their id
*access:Public
*parameter:id
*/

router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book=books.find((each)=> each.id === id);
    if (!book){
        res.status(404).json({
            success:false,
            message:"User Not Found For The Given Id"
        })
    }
    return res.status(200).json({
        success:true,
        data:book
    })
})

/**
*route: /books
*method:post
*descriptions: create NEW BOOK
*access:Public
*parameter:None
*/

router.post("/",(req,res)=>{
    const {id,name,author,genre,price, publisher} = req.body;
    const book=books.find((each)=>each.id===id);
    if (book){
        return res.status(404).json({
            success:false,
            message:"Book with the given Id exist"
        })
    }
    books.push(
        {id,name,author,genre,price, publisher
        })
        return res.status(201).json({
            success: true,
            data: books
        })
})

/**
*route: /books/:id
*method:put
*descriptions: update book by their ID
*access:Public
*parameter: ID
*/

router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=> each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book Not Found For The Given Id :-("
        })
    }

    const updateBook = books.map((each)=>{
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
        data: updateBook
    })

})

module.exports = router;