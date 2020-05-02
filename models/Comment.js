module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      "Comment",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        description:DataTypes.STRING,  
        create_at: DataTypes.DATE,
        update_at: DataTypes.DATE,
        users_id:DataTypes.STRING
        
      },
      {
        timestamps: false,
      }
    );
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Publication, {
        foreignKey: "publications_id",
        as: "publication",
      })
      Comment.belongsTo(models.User, {
        foreignKey: "users_id",
        as:"user"
      })       
    };
  
    return Comment;
  };
  