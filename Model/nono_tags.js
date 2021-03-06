var mongoose = require('mongoose');

var nono_TagsSchema = mongoose.Schema({
   
		Tag_Code                    :Number,
        Tag_Name                    :String,
        Tag_Description             :String,
		Tag_MetaTitle               :String,
		Tag_FocusKeyWord            :String,
        Tag_KeyeordsList            :[String],
        Tag_FeaturedImage_Media_ID  :Number,
        Tag_URL                     :String,
        Tag_IsActive                :Number,

},{
    toJSON: { virtuals: true }
});

nono_TagsSchema.virtual('Media',{
    ref: 'nono_media',
    localField: 'Tag_Feature dImage_Media_ID',
    foreignField: 'Media_Code',
    justOne: false // for many-to-1 relationships
});

var Tags = module.exports = mongoose.model('nono_tag', nono_TagsSchema);



module.exports.getLastCode = function(callback){
    
    Tags.findOne({},callback).sort({Tag_Code:-1});
}