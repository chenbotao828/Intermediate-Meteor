Recipes = new Mongo.Collection('recipes');

Recipes.allow({
    insert: function (userId, doc) {
        return !!userId;
    },
    update: function (userId, doc) {
        return !!userId;
    }
});


Ingredient = new SimpleSchema({
    name: {
        type: String,
        label: "原料"
    },
    amount :{
        type: String,
        label: "数量"
    }
});


RecipeSchema = new SimpleSchema({
    name:{
        type: String,
        label: "菜名"
    },
    desc:{
        type: String,
        label: "描述"
    },
    ingredients:{
        type:[Ingredient],
        label: "食材"
    },
    inMenu: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform:{
            type: "hidden"
        }
    },
    author:{
        type: String,
        label: "创建者",
        autoValue: function(){
            return this.userId
        },
        autoform:{
            type: "hidden"
        }
    },
    createdAt:{
        type: Date,
        label: "创建于",
        autoValue: function(){
            return new Date()
        },
        autoform:{
            type: "hidden"
        }
    }
});

Meteor.methods({
    toggleMenuItem : function  (id, currentState){
        Recipes.update(id, 
            { 
                $set:{
                    inMenu: !currentState
                }
            }
        );
    },
    deletRecipe: function (id) {
        Recipes.remove(id);
    }
});

Recipes.attachSchema(RecipeSchema);