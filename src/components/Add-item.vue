<template>
  <div>
    <div class="title-input">
      <template v-if="editMode">
        <input type="text" class="form-input" v-model.lazy="listName" @keyup.enter="editMode = !editMode">
      </template>
      <template v-else>
        <h1 v-text="listName" @click="editMode = !editMode" style="display:inline-block;"></h1>
      </template>
      <button class="btn btn-primary" @click="editMode = !editMode" title="edycja tytułu">
        <i class="icon" :class="{'icon-edit' : !editMode, 'icon-check' : editMode}"></i>
      </button>
    </div>
    <div class="input-group">
      <span class="input-group-addon addon-lg">Dodaj nowe zadanie</span>
      <input class="form-input input-lg" type="text" placeholder="..." v-model="newTaskName" @keyup.enter="addnewtask">
      <button class="btn btn-primary input-group-btn btn-lg" @click="addnewtask">Dodaj</button>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      newTaskName: '',
      listName: 'toDo',
      editMode: false
    }
  },
  methods: {
    addnewtask: function() {
      this.$emit("addnewtask", this.newTaskName);
      this.newTaskName = '';
    }
  }
}
</script>