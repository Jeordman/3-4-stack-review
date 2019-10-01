//INITIALIZE LIST TO MANIPULATE WITH DEFAULT DATA
//later this would be done on an actual Database
const list = ["Insult Tavas", "Fight Derek", "Go on a date with Rylie"];

//every function in module.exports will be exported to be used else-ware
module.exports = {
  //this is connected to the get endpoint
  fullList(req, res) {
    res.status(200).send(list);
  },

  //this is connected to the post endpoint
  addItem(req, res) {
    //grab the new item and push it to the list
    const { addOn } = req.body;
    list.push(addOn);
    res.status(200).send(list);
  },

  //this is connected to the delete endpoint
  deleteItem(req, res) {
    //grab the index where we will delete and use it for a splice
    const { index } = req.params;
    list.splice(index, 1);
    res.status(200).send(list);
  },

  //this is connected to the put endpoint
  editItem(req, res) {
    //change the item in the list at the correct index to be the new text
    const { index, newItem } = req.body;
    list[index] = newItem;
    res.status(200).send(list);
  }
};
