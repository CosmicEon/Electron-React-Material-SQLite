import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
const path = require('path');


const db = new Sequelize('shoppingCart', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'DB', 'CryptoBeast.sqlite'),
  operatorsAliases: false
});

const MemberModel = db.define('member', {
  email: { type: Sequelize.STRING },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

// const GroupModel = db.define('group', {
//   name: { type: Sequelize.STRING },
//   description: { type: Sequelize.STRING }
// });

const CardModel = db.define('card', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
});

const WorkspaceModel = db.define('workspace', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
});

const WorkspaceMember = db.define('workspacemember', {});

MemberModel.hasMany(CardModel);
CardModel.belongsTo(MemberModel);

// GroupModel.hasMany(MemberModel);
// MemberModel.belongsTo(GroupModel);

MemberModel.belongsToMany(WorkspaceModel, { through: WorkspaceMember });
WorkspaceModel.belongsToMany(MemberModel, { through: WorkspaceMember });

WorkspaceModel.hasMany(CardModel);
CardModel.belongsTo(WorkspaceModel);

// WorkspaceModel.hasMany(GroupModel);
// GroupModel.belongsTo(WorkspaceModel);

// // create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(3, () => {
    return WorkspaceModel.create({
      name: casual.name,
      description: casual.sentences(2),
    })
      .then((workspace) => {
        return Promise.all(
          _.times(5, () =>
            workspace.createMember({
              email: casual.email,
              firstName: casual.first_name,
              lastName: casual.last_name,
            })),
        )
          .then((members) => {
            members.forEach((member, i) => {
              Promise.all([
                CardModel.create({
                  name: casual.sentence,
                  description: casual.sentences(2),
                  createdBy: member.dataValues.id,
                  assignedTo: member.dataValues.id,
                }),
                CardModel.create({
                  name: casual.sentence,
                  description: casual.sentences(3),
                  createdBy: member.dataValues.id,
                  assignedTo: null,
                }),
              ])
                .then((cards) => {
                  member.setCards(cards);
                  workspace.setCards(cards);
                });
            });
          });
      });
  });
});

const Member = db.models.member;
// const Group = db.models.group;
const Card = db.models.card;
const Workspace = db.models.workspace;

// export { Member, Group, Card, Workspace };
export { Member, Card, Workspace };
