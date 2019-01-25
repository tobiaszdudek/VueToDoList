<template>
  <div style="text-align:center;">
    <button class="btn" :class="{'active' : status === 'all'}" @click="setstatus('all')" title="pokaż wszystkie">All ({{ alltasks }})</button>
    <button class="btn" :class="{'active' : status === 'active'}" @click="setstatus('active')" title="pokaż aktywne">Active ({{ activetasks }})</button>
    <button class="btn" :class="{'active' : status === 'done'}" @click="setstatus('done')" title="pokaż ukończone">Done ({{ donetasks }})</button>
    <button class="btn" :class="{'active' : status === 'remove'}" @click="setstatus('remove')" title="pokaż usunięte">Deleted ({{ deletedtasks }})</button>
  </div>
</template>
<script>
export default {
  props: ["alltasks", "activetasks", "donetasks", "deletedtasks"],
  data: function() {
    return {
      status: 'active'
    }
  },
  methods: {
    setstatus: function(status) {
      this.status = status;
      this.$emit("setstatus", status);
    }
  }
}
</script>