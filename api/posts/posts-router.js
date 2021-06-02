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
router.post('/', (req, res)=>{
 
})
router.put('/:id', (req, res)=>{
    
})
router.delete('/:id', (req, res)=>{

})


module.exports = router