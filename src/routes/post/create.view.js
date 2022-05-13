module.exports = async (req, res) => {
    res.render('post', { user: req.verifiedUser.user });
}