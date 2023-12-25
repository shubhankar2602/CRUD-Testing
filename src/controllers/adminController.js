const userModel = require('../models/userModel');


const createUser = async (req,res)=>{
    try {
        const { username, email, phone, password, role } = req.body;
        const newUser = new userModel({
          username,
          email,
          password,
          role: role || 'user', 
        });
    
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

const getUser = async (req, res) => {
    try {
  
      const user = await userModel.find();
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, email, phone, password, role } = req.body;
  
      const userrole = role === 'admin' ? 'admin' : 'user';
  
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { username, email, phone, password, role },
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const deletedUser = await userModel.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}