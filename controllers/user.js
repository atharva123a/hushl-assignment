const User = require("../models/User");

const CustomError = require('../errors/custom-api');

const createAccount = async(req, res) => {
    const { name, balance } = req.body;
    if (!name || !balance) {
        throw new CustomError("Please enter name and balance");
    }

    const user = await User.create({ name, balance });

    res.status(201).json({ success: true, msg: "Account created!" });
}

const viewAccount = async (req, res) => {
    const { id } = (req.params);
    console.log(id);    
    const user =  await User.findById(id);
    
    if(!user) {
        throw new CustomError("No user found!");
    }

    const {balance} = user;

    res.status(200).json({"Balance" : balance});
}

const withdraw = async (req, res) => {
    const { id } = (req.params);
    const user =  await User.findById(id);
    
    if(!user) {
        throw new CustomError("No user found!");
    }

    let {amount} = req.body;
    if(!amount) {
        throw new CustomError("Please provide amount!");
    }
    amount = parseInt(amount);
    let balanceLeft = user.balance - amount;
    if(balanceLeft < 0){
        throw new CustomError("Cannot withdraw such a large amount!");
    }

    user.balance = balanceLeft;
    let balance = user.balance;
    await user.save();

    res.status(200).json(`Balance remaining is : ${balance}`);


}

const deposit = async (req, res) => {
    const { id } = (req.params);
    const user =  await User.findById(id);
    
    if(!user) {
        throw new CustomError("No user found!");
    }

    let {amount} = req.body;
    if(!amount) {
        throw new CustomError("Please provide amount!");
    }

    if(amount < 0){
        throw new CustomError("Cannot deposit negative value for amount!!");
    }
    amount = parseInt(amount);
    user.balance = user.balance + amount;
    await user.save();
    
    let balance = user.balance;
    res.status(200).json(`Balance remaining is : ${balance}`);

}

const deleteAccount = async (req, res) => {
    const { id } = (req.params);
    const user =  await User.findById(id);
    
    if(!user) {
        throw new CustomError("No user found!");
    }
    await user.remove();
    res.json("Account deleted!");    
}

module.exports = {createAccount, viewAccount, withdraw, deposit, deleteAccount};