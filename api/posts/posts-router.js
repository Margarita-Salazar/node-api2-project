// implement your posts router here
const router = require('express').Router()

const Post = require('./posts-model')

router.get('/', (req, res)=>{
    Post.find()
        .then(post =>{
            res.status(200).json(post)
        })
        .catch(()=>{
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            })
        })
})
router.get('/:id', async (req, res)=>{
    const post = await Post.findById(req.params.id)
    try{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        }
    }catch(err){
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    }
})
router.post('/', async (req, res)=>{
    const { title, contents } = req.body
    try{
        if(
            !title ||
            !title.trim() ||
            !contents ||
            !contents.trim()
        ){
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        }else{
            const newPostID = await Post.insert(req.body)
            const post = await Post.findById(newPostID.id)
            res.status(201).json(post)
        }
    }catch(err){
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    }
 
})
router.put('/:id', async (req, res)=>{
    const id = req.params.id
    const { title, contents } = req.body
    const post = await Post.findById(id)
    try{
        if(post){
            if(
                !title ||
                !title.trim() ||
                !contents ||
                !contents.trim()
            ){
                res.status(400).json({
                    message: 'Please provide title and contents for the post'
                })
            }else{
                await Post.update(id, req.body)
                const updatePost = await Post.findById(id)
                res.status(200).json(updatePost)
            }
        }else{
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        }
    }catch(err){
        res.status(500).json({
            message: 'The post information could not be modified'
        })
    }
})
router.delete('/:id', (req, res)=>{

})


module.exports = router