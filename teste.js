const { Publication, User, Comment } = require("./models");
const moment = require('moment')

async function verFeed() {
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

  
  console.log(listaDePublications[0].comments[0].user)
  
    

  
}

async function criarPublicacao() {
  const newPublication = await Publication.create({
    image: "link",
    like: 0,
    create_at: new Date(),
    update_at: new Date(),
    users_id: 1,
  });

  console.log(newPublication);
}

async function verPublicacoes(idUser) {
  const user = await User.findByPk(idUser, {
    include: {
      model: Publication,
    },
  });

  const publications = await Publication.findAll({
    where: {
      users_id: idUser,
    },
    include: {
      model: User,
      as: "user",
    },
  });

  console.log(publications);
}

async function verComentarios() {
  const comments = await Comment.findAll({
    include: {
      model: Publication,
      as: "publication",
    },
  })

  console.log(comments[0].publication)
}

verFeed()