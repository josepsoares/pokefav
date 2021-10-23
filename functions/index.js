const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = (notifContent, notifUsername, notifAvatar) => {
  const notification = {
    content: notifContent,
    user: notifUsername,
    avatar: notifAvatar,
    time: admin.firestore.FieldValue.serverTimestamp(),
    reactions: {
      psyduck: 0,
      pikachu: 0,
      zubat: 0,
      caterpie: 0,
      mankey: 0
    }
  };
  return admin.firestore().collection('notifications').add(notification);
};

exports.userDataChanged = functions.firestore
  .document('users/{userId}')
  .onUpdate(doc => {
    var before = doc.before.data();
    var after = doc.after.data();
    let notificationContent;

    if (before.avatar !== after.avatar) {
      notificationContent = `Updated their profile information`;
      return createNotification(
        notificationContent,
        after.username,
        after.avatar
      );
    }

    if (before.favoritePokemons.length !== after.favoritePokemons.length) {
      if (after.addFavoriteAction === true) {
        notificationContent = `Added ${
          after.favoritePokemons[after.favoritePokemons.length - 1].editedName
        } to their Favorites Pokémon List`;
      } else {
        notificationContent = `Removed ${
          before.favoritePokemons[before.favoritePokemons.length - 1].editedName
        } from their Favorites Pokémon List`;
      }
      return createNotification(
        notificationContent,
        after.username,
        after.avatar
      );
    } else if (before.favoriteTeam.length !== after.favoriteTeam.length) {
      if (after.addFavoriteAction === true) {
        notificationContent = `Added ${
          after.favoriteTeam[after.favoriteTeam.length - 1].editedName
        } to their Favorite Pokémon Team`;
      } else {
        notificationContent = `Removed ${
          before.favoriteTeam[before.favoriteTeam.length - 1].editedName
        } from their Favorite Pokémon Team`;
      }
      return createNotification(
        notificationContent,
        after.username,
        after.avatar
      );
    } else if (before.friends.length !== after.friends.length) {
      const notificationContent = `Added ${
        after.friends[after.friends.length - 1].username
      } to their following list`;
      return createNotification(
        notificationContent,
        after.username,
        after.avatar
      );
    } else if (
      before.minigames.pokeTrivia.played !== after.minigames.pokeTrivia.played
    ) {
      const notificationContent = `Concluded a PokéTrivia and currently has a record of ${after.minigames.pokeTrivia.correctAwnsers} correct answers and ${after.minigames.pokeTrivia.incorrectAwnsers} of incorrect answers.`;
      return createNotification(
        notificationContent,
        after.username,
        after.avatar
      );
    }
  });

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();

      admin
        .firestore()
        .collection('counters')
        .doc('users')
        .update({
          number: admin.firestore.FieldValue.increment(1)
        });

      return createNotification(
        'Just joined PokéFavo!',
        newUser.username,
        newUser.avatar
      );
    });
});
