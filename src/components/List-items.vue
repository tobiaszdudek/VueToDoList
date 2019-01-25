<template>
  <table class="table">
    <thead>
      <tr>
        <th>Nr.</th>
        <th>Zadanie</th>
        <th>Edytuj</th>
        <th>Oznacz jako wykonane</th>
        <th>Usuń</th>
      </tr>
    </thead>
    <tbody>
      <singleitem v-for="(item, index) in filtered" :item="item" :index="index" :key="item.id" :class="{'cross' : item.isRemove}" />
    </tbody>
  </table>
</template>
<script>
import Singleitem from "./Single-item";

export default {
  props: ["filtered"],
  components: {
    Singleitem
  }
}
</script>