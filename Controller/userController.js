var CPUser = require('../Model/nono_cp_users');
var Medias = require('../Model/nono_medias');


module.exports = {


	addUser:function(request,response){
		CPUser.getLastCode(function(err,user){
			if (user) 
				InsertIntoUser(user.CP_User_Code+1);
			else
				InsertIntoUser(1);
		});

		function InsertIntoUser(NextCode){
			var newCPUser = new CPUser();
			newCPUser.CP_User_Code     		 		= GetNextId;
			newCPUser.CP_User_Name 	     	 		= request.body.user_name;
			newCPUser.CP_User_Password   	 		= request.body.password;
			newCPUser.CP_User_DisplayName	 		= request.body.display_name;
			newCPUser.CP_User_ProfilePic_Media_ID   = request.body.media_id;
			newCPUser.CP_User_Bio   	 			= request.body.bio;
			newCPUser.CP_User_Permissions   		= [];
			newCPUser.CP_User_IsActive				= 1;
			
			newCPUser.save(function(error, doneadd){
				if(error){
					return response.send({
						message: error
					});
				}
				else{
					return response.send({
						message: true
					});
				}
			});
		}
	},

	editUser:function(request,response){
		var newUser = new CPUser;
		var newvalues = { $set: {
				CP_User_Name 				: request.body.user_name,
				CP_User_Password 			: newUser.generateHash(request.body.password), 
				CP_User_DisplayName 		: request.body.display_name,
				CP_User_ProfilePic_Media_ID : request.body.media_id,
				CP_User_Bio 				: request.body.bio,
				CP_User_RoleList_Role_ID 	: request.body.role_id,
				CP_User_IsActive 			: request.body.status,
			} };

		var myquery = { CP_User_Code: request.body.row_id }; 


		CPUser.findOneAndUpdate( myquery,newvalues, function(err, field) {
    	    if (err){
    	    	return response.send({
					// user : request.user ,
					message: 'Error'
				});
    	    }
            if (!field) {
            	return response.send({
					// user : request.user ,
					message: 'User not exists'
				});
            } else {

                return response.send({
					message: true
				});
			}
		})
	},

	getAllUsers:function(request,response){
		CPUser.find({})
		.populate({ path: 'Media', select: 'Media_Code Media_Title' })
		.lean()
		.exec(function(err, user) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (user) {
	            response.send(user);
	        } 
    	}).sort({CP_User_Code:-1}).limit(20)
	},

	getActiveUsers:function(request,response){
		CPUser.find({CP_User_IsActive:1})
		.populate({ path: 'Media', select: 'Media_Code Media_Title' })
		.lean()
		.exec(function(err, field) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (field) {
	        	
	            response.send(field);
	        } 
    	});
	}
}






