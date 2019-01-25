<template>
    <div id="app" v-cloak>

        <additem @addnewtask='addnewtask' />

        <listitems :filtered="filtered" />

        <filteritems
        style="margin-top: 25px;"
        @setstatus="setstatus"
        :alltasks="alltasks"
        :activetasks="activetasks"
        :donetasks="donetasks"
        :deletedtasks="deletedtasks" /> 

    </div>  
</template>

<script>
    import EventBus from './components/event-bus';
    import Additem from "./components/Add-item";
    import Singleitem from "./components/Single-item";
    import Listitems from "./components/List-items";
    import Filteritems from "./components/Filter-items";

    export default {
        data() {
            return {
                items: [
                    { 'id' : 1,  'task' : 'Odkurzyć', 'isDone' : true, 'isRemove' : false },
                    { 'id' : 2,  'task' : 'Umyć naczynia', 'isDone' : false, 'isRemove' : false },
                    { 'id' : 3,  'task' : 'Przeczytać książkę', 'isDone' : false, 'isRemove' : false },
                    { 'id' : 4,  'task' : 'Ugotować obiad', 'isDone' : false, 'isRemove' : true }
                ],
                status: 'active',
                filtered: []                  
            }
        },
        computed: {
            alltasks: function(){
                return this.items.length;
            },
            activetasks: function(){
                var filtered = this.items.filter(val => val.isDone !== true && val.isRemove !== true);
                return filtered.length;
            },
            donetasks: function(){
                var filtered = this.items.filter(val => val.isDone === true);
                return filtered.length;
            },
            deletedtasks: function(){
                var filtered = this.items.filter(val => val.isRemove === true);
                return filtered.length;
            }
        },
        methods: {
            setstatus: function(status){
                this.status = status;
                if(status === 'active'){
                    this.filtered = this.items.filter(val => val.isDone !== true && val.isRemove !== true);
                }else if(status === 'done'){
                    this.filtered = this.items.filter(val => val.isDone === true);
                }else if(status === 'remove'){
                    this.filtered = this.items.filter(val => val.isRemove === true);
                }else{
                    this.filtered = this.items.filter(val => val);
                }
            },
            done: function(index){
                var index = _.findIndex(this.items, ["id", index]);
                this.items[index].isDone = true;
            },
            undone: function(index){
                var index = _.findIndex(this.items, ["id", index]);
                this.items[index].isDone = false;
            },
            remove: function(index){
                var index = _.findIndex(this.items, ["id", index]);
                this.items[index].isRemove = true;
            },
            permanentremove: function(index){
                var confirmation = confirm('Jesteś pewien, że chcesz całkowicie usunąć to zadanie z listy?');
                if(confirmation){
                    var index = _.findIndex(this.items, ["id", index]);
                    this.items.splice(index, 1);                    
                }

                //aktualizacja wyświetlanej listy zadań
                this.setstatus(this.status);
            },
            undoremove: function(index){
                var index = _.findIndex(this.items, ["id", index]);
                this.items[index].isRemove = false;
            },
            addnewtask: function(taskName){
                if(taskName.length > 2){
                    this.items.push({
                        'id' : this.items.length+1,
                        'task' : taskName,
                        'isDone' : false,
                        'isRemove' : false
                    });     

                    //aktualizacja wyświetlanej listy zadań 
                    this.setstatus(this.status);                    
                }
            }                       
        },
        created: function(){
            this.filtered = this.items.filter(val => val.isDone !== true && val.isRemove !== true);
            EventBus.$on("remove", this.remove);
            EventBus.$on("undone", this.undone);
            EventBus.$on("done", this.done);
            EventBus.$on("permanentremove", this.permanentremove);
            EventBus.$on("undoremove", this.undoremove);                                               
        },
        components: {
            Additem,
            Listitems,
            Filteritems,
            Singleitem
        }      
    }

</script>