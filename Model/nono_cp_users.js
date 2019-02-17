var mongoose = require('mongoose');

var nono_CpUserSchema = mongoose.Schema({
   
		CP_User_Code                  :Number,
        CP_User_Name                  :String,
        CP_User_Password              :String,
		CP_User_DisplayName           :String,
		CP_User_ProfilePic_Media_ID   :Number,
        CP_User_Bio                   :String,
        CP_User_Permissions           :[String],
        CP_User_IsActive               :Number
},{
    toJSON: { virtuals: true }
});


nono_CpUserSchema.virtual('Media',{
    ref: 'nono_media',
    localField: 'CP_User_ProfilePic_Media_ID',
    foreignField: 'Media_Code',
    justOne: false // for many-to-1 relationships
});



// nono_CpUserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

nono_CpUserSchema.methods.verifyPassword = function(password) {
    if(password.localeCompare(this.CP_User_Password) == 0)
        return 1;
    else
        return 0;
};

// nono_CpUserSchema.methods.updatePassword = function(password) {
//     this.CP_User_Password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// 	this.save();
// };



var CPUser = module.exports = mongoose.model('nono_cp_user', nono_CpUserSchema);



module.exports.getLastCode = function(callback){
    
    CPUser.findOne({},callback).sort({CP_User_Code:-1});
}