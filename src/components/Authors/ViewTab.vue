<template>
  <div class="col-12 border h-100">

    <br>
    <div><p class="fw-bold">firstname :</p> {{ item.firstname }} </div>
    <br>
    <div><p class="fw-bold">lastname :</p> {{ item.lastname }} </div>
    <br>
    <div><p class="fw-bold">birthdate :</p> {{ item.birthdate }} </div>
    <br>
    <div v-if="item.death_date"><p class="fw-bold">death_date :</p> {{ item.death_date }} </div>
    <div v-else="item.death_date"><p class="fw-bold">death_date :</p> No value </div>
    <br>
    <p class="fw-bold">Books :</p>
    <div v-if="item.books" v-for="item in item.books.data"> {{ item.name }} <br></div>
    <div v-else="item.books"> No value <br></div>

    <button class="btn btn-danger mt-4 mb-3" @click="deleted(item.uuid)">delete</button>

  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'ViewTab',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods : {
    deleted(uuid) {

      var result = confirm("Want to delete?");
      if (result) {

        axios
            .delete("http://127.0.0.1:8000/api/authors/" + uuid, {
              headers: {
                'Authorization': 'Bearer 1APWZ799cVZgF7zxRgay9K50CICJZrHFnkr5IM3N'
              }
            })
            .then(response => {
              alert('success delete');
              location.reload();
            });

      }
    }
  }
}


</script>


<style lang="scss" scoped>

</style>
