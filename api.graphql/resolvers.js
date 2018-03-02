// import { Member, Group, Card, Workspace } from './connectors';
import { Member, Card, Workspace } from './connectors';

const resolvers = {
  Query: {
    me(root, args) {
      return Member.find({ where: { id: 1 } });
    },
    members(root, args) {
      return Member.findAll();
    },
    // membersByWorkspace(root, args) {
    //   return Member.find({ where: args });
    // },
    member(root, args) {
      return Member.find({ where: args });
    },
    // groups(root, args) {
    //   return Group.findAll();
    // },
    // groupsByWorkspace(root, args) {
    //   return Group.find({ where: args});
    // },
    // group(root, args) {
    //   return Group.find({ where: args });
    // },
    cards(root, args) {
      return Card.findAll();
    },
    // cardsByWorkspace(root, args) {
    //   return Card.find({ where: args });
    // },
    card(root, args) {
      return Card.find({ where: args });
    },
    workspaces(root, args) {
      return Workspace.findAll();
    },
    workspace(root, args) {
      return Workspace.find({ where: args });
    },
  },
  Mutation: {
    deleteCard(root, args) {
      const card = Card.find({ where: args });
      const res = Card.destroy({ where: args });
      if (res) {
        console.log('res', res);
      }
      return card;
    },
  },
  Member: {
    // groups(member) {
    //   return member.getGroups();
    // },
    // group(member) {
    //   return member.getGroup();
    // },
    cards(member) {
      return member.getCards();
    },
    workspaces(member) {
      return member.getWorkspaces();
    },
  },
  // Group: {
  //   members(group) {
  //     return group.getMembers();
  //   },
  //   workspace(group) {
  //     return group.getWorkspace();
  //   }
  // },
  Card: {
    workspace(card) {
      return card.getWorkspace();
    },
  },
  Workspace: {
    cards(workspace) {
      return workspace.getCards();
    },
    members(workspace) {
      return workspace.getMembers();
    },
    // groups(workspace) {
    //   return workspace.getGroups();
    // }
  },
};

export default resolvers;
