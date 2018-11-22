var Tags = require('../Model/nono_tags');


module.exports = {


	addTag:function(request,res){
		Tags.getLastCode(function(err,tag){
			if (tag) 
				insetIntoTag(tag.Tag_Code+1);
			else
				insetIntoTag(1);
		});

		function insetIntoTag(GetNextId){
			var newTag = new Tags();
			newTag.Tag_Code     		 		= GetNextId;
			newTag.Tag_Name 	     	 		= request.body.name;
			newTag.Tag_Description   	 		= request.body.desc;
			newTag.Tag_MetaTitle	 			= request.body.meta_title;
			newTag.Tag_FocusKeyWord   			= request.body.focus_keyword;
			newTag.Tag_KeyeordsList   	 	    = request.body.keyeords_list ;
			newTag.Tag_FeaturedImage_Media_ID  	= request.body.featured_image_media_id;
			newTag.Tag_URL   					= request.body.url;
			newTag.Tag_IsActive 				= 1;

			newTag.save(function(error, doneadd){
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

	editTag:function(request,res){
		var newvalues = { $set: {
				Tag_Name 					: request.body.name,
				Tag_Description 			: request.body.desc,
				Tag_MetaTitle 				: request.body.meta_title,
				Tag_FocusKeyWord 			: request.body.focus_keyword,
				Tag_KeyeordsList 			: request.body.keyeords_list,
				Tag_FeaturedImage_Media_ID 	: request.body.featured_image_media_id,
				Tag_URL 					: request.body.url,
				Tag_IsActive 				: request.body.status,
			} };

		var myquery = { Tag_Code: request.body.row_id }; 


		Tags.findOneAndUpdate( myquery,newvalues, function(err, field) {
    	    if (err){
    	    	return response.send({
					message: 'Error'
				});
    	    }
            if (!field) {
            	return response.send({
					message: 'Tags not exists'
				});
            } else {
                return response.send({
					message: true
				});
			}
		})
	},

	getAllTags:function(request,res){

		Tags.find({}, function(err, tag) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (tag) {
	        	
	            response.send(tag);
	        } 
    	}).sort({Tag_Code:-1}).limit(20)
	},

	getActiveTags:function(request,res){
		Tags.find({Tag_IsActive:1}, function(err, field) {
		    if (err){
		    	response.send({message: 'Error'});
		    }
	        if (field) {
	        	
	            response.send(field);
	        } 
    	});
	}
}






