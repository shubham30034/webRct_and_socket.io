class UserDto{
  id;
  phone;
  activated;
  createdAt;
  avatar;

    constructor(user){
     this.id = user._id;
     this.phone = user.phone;
     this.activated = user.activated;
     this.createdAt = user.createdAt;
     this.avatar = user.avatar
    }
}


module.exports = UserDto