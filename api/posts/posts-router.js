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
router.get('/:id', (req, res)=>{
    
})
router.post('/', (req, res)=>{
    
})
router.put('/:id', (req, res)=>{
    
})
router.delete('/:id', (req, res)=>{

})


module.exports = router