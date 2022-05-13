const axios = require('axios');
// const e = require('express')

module.exports = async (req, res) => {
    const postInputs = req.body
    
    const postData = {
        userId: req.verifiedUser.user._id,
        title: postInputs['title'],
        description: postInputs['description']
        
    }
    console.log(postData)
    const mutation = `
        mutation createPost($userId: String!, $title: String!, $description: String!) { 
            createPost( userId: $userId, title: $title, description: $description )
        }`

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query: mutation,
                variables: postData
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   
        console.log(data)
        res.redirect('/')
     } catch(e) {
        console.log(e)
    }   

    res.redirect("/")
}














