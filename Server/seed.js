const mongoose = require('mongoose');
const Action_log = require('../Server/models/ActionLog'); // שים לב לנתיב הנכון
const Users = require('../Server/models/User');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/Factory'); // שנה לפי הצורך

  // צור משתמש קודם
  const user = new Users({ Full_Name: "Alice", Num_Of_Actions: 5 });
  await user.save();

  // צור לוג פעולה עם userId
  const action = new Action_log({
    userId: user._id,
    actionType: "Login",
    details: "User logged in successfully"
  });

  await action.save();

  console.log("Seed completed");
  mongoose.disconnect();
}

seed();
