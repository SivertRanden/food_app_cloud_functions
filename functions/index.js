const functions = require('firebase-functions');
fs = FireBaseFirestore.getInstances();
exports.getUser = functions.https.onCall((data, context) => {
  const id = data.id;
  const userRef = fs.collection("users").doc(id);

  userRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const user = {
        id = id,
        activeRecipes = getRecipesByIdList(doc.data.activeRecipes),
        checkedIngredients = doc.data.checkedIngredients
      }
    }
  }).catch(err => {
    console.log("Error getting document", err);
  });
});

const getRecipesByIdList = (idList) => {
  const recipesRefs = []
  for(let i = 0; i < idList.length; i++) {
    recipesRefs.push(fs.collection("recipes").doc(idList[i]));
  }
  fs.getAll(recipesRefs).then(docs => {
    return docs;
  })
};


