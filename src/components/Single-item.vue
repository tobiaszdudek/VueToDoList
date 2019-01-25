<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      <template v-if="editMode">
        <div class="form-group">
          <input type="text" class="form-input" v-model.lazy="item.task">
        </div>
      </template>
      <template v-else>
        {{ item.task }}
      </template>
    </td>
    <td>
      <button class="btn btn-primary" @click="editMode = !editMode">
        <i class="icon" :class="{'icon-edit' : !editMode, 'icon-check' : editMode}"></i>
      </button>
    </td>
    <td>
      <template v-if="item.isDone">
        <button class="btn btn-primary" @click="undone(item.id)" title="edytuj zadanie">
          <i class="icon icon-check"></i>
        </button>
      </template>
      <template v-else>
        <button class="btn btn-primary" @click="done(item.id)" title="zmiana statusu zadania">
          <i class="icon icon-stop"></i>
        </button>
      </template>
    </td>
    <td>
      <template v-if="item.isRemove">
        <button class="btn btn-error" @click="permanentremove(item.id)" title="usuń definitywnie">
          <i class="icon icon-delete"></i>
        </button>
        <button class="btn btn-error" @click="undoremove(item.id)" title="przywróć">
          <i class="icon icon-refresh"></i>
        </button>
      </template>
      <template v-else>
        <button class="btn btn-error" @click="remove(item.id)" title="usuń">
          <i class="icon icon-delete"></i>
        </button>
      </template>
    </td>
  </tr>
</template>
<script>
import EventBus from './event-bus';

export default {
  props: ["item", "index"],
  data() {
    return {
      editMode: false
    }
  },
  methods: {
    done: function(index) {
      EventBus.$emit('done', index);
    },
    undone: function(index) {
      EventBus.$emit('undone', index);
    },
    remove: function(index) {
      EventBus.$emit('remove', index);
    },
    permanentremove: function(index) {
      EventBus.$emit('permanentremove', index);
    },
    undoremove: function(index) {
      EventBus.$emit('undoremove', index);
    }
  }
}
</script>