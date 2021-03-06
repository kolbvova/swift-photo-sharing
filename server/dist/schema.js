"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.schema = apollo_server_express_1.gql `
    enum Role{
        administrator
        authenticated
    }

    scalar Time
    scalar DateTime
    directive @hasRole(roles: [Role]) on FIELD_DEFINITION

    type Attachment{
        id: ID!
        name: String!
        originalName: String!
        contentType: String!
        size: Int!
        url: String!
        created: DateTime!
        user: User
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        roles: [String]!
        phone: String!
        created: DateTime!
    }

    type Token{
        id: String!
        user: User!
        expired: DateTime!
    }


    input NewPost{
        title: String!
    }

    input NewUser{
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        phone: String!
    }

    type Image{
        id: ID!
        image: Attachment!
        created: DateTime!
        album: Album!
        audioWho: Attachment
        audioWhen: Attachment
        audioWhere: Attachment
        author: User!
    }

    type Album {
        id: ID!
        name: String!
        created: DateTime!
        images: [Image]
        author: User!
        shareCode: String!
    }

    type Sharing {
        id: ID!
        album: Album!
        created: DateTime!
        author: User!
    }

    type Query {
        me: User! @hasRole(roles: [authenticated])
        findAllAlbum: [Album!] @hasRole(roles: [authenticated])
        findAllImage: [Image!] @hasRole(roles: [authenticated])
        findAllAlbumByAuthor: [Album!] @hasRole(roles: [authenticated])
    }

    type Mutation {
        register(input: NewUser!): User!
        login(email: String!, password: String!): Token!
        saveAlbum(name: String!): Album! @hasRole(roles: [authenticated])
        deleteAlbum(id: ID!): Album! @hasRole(roles: [authenticated])
        findAlbumById(id: ID!): Album @hasRole(roles: [authenticated])
        findAllImageByAlbumId(albumId: ID!): [Image!] @hasRole(roles: [authenticated])
        saveImage(imageId: ID!, albumId: ID!): Image @hasRole(roles: [authenticated])
        saveAudio(id: ID!, audioId: ID!, type: String!): Image! @hasRole(roles: [authenticated])
        deleteImage(id: ID!): Image! @hasRole(roles: [authenticated])
        findImage(id: ID!): Image! @hasRole(roles: [authenticated])
        addAlbumShare(shareCode: String!): Sharing! @hasRole(roles: [authenticated])
    }

`;
//# sourceMappingURL=schema.js.map