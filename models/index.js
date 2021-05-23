const user = require('./User');
const post = require('./Post');
const comment = require('./Comment');

user.hasMany(post, {
    foreignKey: 'user_id'
});

user.hasMany(comment, {
    foreignKey: 'user_id'
});

post.belongsTo(user, {
    foreignKey: 'user_id'
});

post.hasMany(comment, {
    foreignKey: 'post_id'
});

comment.belongsTo(user, {
    foreignKey: 'user_id'
});

comment.belongsTo(post, {
    foreignKey: 'post_id'
});

module.exports = user;
module.exports = post;
module.exports = comment;