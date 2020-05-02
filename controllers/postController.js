const { Publication, User, Comment } = require("../models");
const moment = require('moment')

const postController = {
  create: (req, res) => {
    const { user } = req.session;    
    return res.render("post", {user})
  },

  store: async (req, res) => {
    const [photo] = req.files;
    const { user } = req.session;

    await Publication.create({
      image: `/posts/${photo.filename}`,
      like: 0,
      users_id: user.id,
      create_at: new Date(),
      update_at: new Date(),
    });

    return res.redirect("/home");
  },
  index: async (req, res) => {
    const { user } = req.session;
    const listaDePublications = await Publication.findAll({
      include: [
        {
          model: User,
          as: "user",        
        }, 
        {
          model: Comment,
          as:'comments',
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        },
                
      ],
    });

      const dataFormatada = []
      listaDePublications.forEach((publication)=>{
        
        const data = moment(publication.create_at).startOf('hour').fromNow()
        
        dataFormatada.push(data)
        
      })

      console.log(listaDePublications[0].comments)
        
      res.render("index", { listaDePublications, user, dataFormatada  });         
    },
    comment:  async (req, res) => {
      const {description} = req.body
      const {id} = req.params
      const { user } = req.session;     
      
      await Comment.create({
        description: description,        
        create_at: new Date(),
        update_at: new Date(),
        publications_id: id,
        users_id: user.id
      });

      return res.redirect("/home");
    } 
  
};

module.exports = postController;


