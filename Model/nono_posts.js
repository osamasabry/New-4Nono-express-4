var mongoose = require('mongoose');

var nono_PostsSchema = mongoose.Schema({
   
		Post_Code                       :Number,
        Post_Title                      :String,
        Post_URL                        :String,
		Post_Content                    :String,
		Post_FocusKeyword               :String,
        Post_MetaDescription            :String,
        Post_FeaturedImage_Media_ID     :Number,
        Post_KeywordsList               :[String],
        Post_CategoriesList_Category_ID :[Number],
        Post_TagsList_Tag_ID            :[Number],
        Post_CreatedBy_User_ID          :Number,
        Post_CreatedOn                  :Date,
        Post_SentToPublishOn            :Date,
        Post_PublishedBy_User_ID        :Number,
        Post_PublishedOn                :Date,
        Post_Status                     :Number,

},{
    toJSON: { virtuals: true }
});


nono_PostsSchema.virtual('Category',{
    ref: 'nono_category',
    localField: 'Post_CategoriesList_Category_ID',
    foreignField: 'Category_Code',
    justOne: false // for many-to-1 relationships
});

nono_PostsSchema.virtual('Tag',{
    ref: 'nono_tag',
    localField: 'Post_TagsList_Tag_ID',
    foreignField: 'Tag_Code',
    justOne: false // for many-to-1 relationships
});

nono_PostsSchema.virtual('Media',{
    ref: 'nono_media',
    localField: 'Post_FeaturedImage_Media_ID',
    foreignField: 'Media_Code',
    justOne: false // for many-to-1 relationships
});

nono_PostsSchema.virtual('User',{
    ref: 'nono_cp_user',
    localField: 'Post_CreatedBy_User_ID',
    foreignField: 'CP_User_Name',
    justOne: false // for many-to-1 relationships
});




var Post = module.exports = mongoose.model('nono_post', nono_PostsSchema);



module.exports.getLastCode = function(callback){
    
    Post.findOne({},callback).sort({Post_Code:-1});
}