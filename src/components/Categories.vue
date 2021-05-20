<template>

  <div id="edit" v-if="EditIsActive" class="position-absolute top-50 start-50 translate-middle" style="z-index: 1;">
    <div style="height: 60vh; width: 60vw;" class="bg-white border">
      <h1 class="mt-5 mb-5">Edit</h1>
      <div class="col-7 mt-3 row align-items-center m-auto">
        <p class="col-12 p-0 m-0">Uuid : {{uuidEdit}}</p>
      </div>
      <input class="col-7 mt-3" type="text" v-model="nameEdit" placeholder="name...">
      <br>
      <button class="btn btn-secondary mt-4" @click="edited(uuidEdit, nameEdit)">edit</button>
    </div>
  </div>

  <div id="editBackground" @click="hideEdit" v-if="EditIsActive" class="position-absolute top-50 start-50 translate-middle" style="height: 100vh; width: 100vw; background-color: #0000004d; z-index: 0;"></div>

  <div class="container-fluid row d-flex justify-content-center mt-3">
    <h1>Categories</h1>

    <div class="row col-12 mb-5">

      <div class="row col-8">

        <div class="col-3 mt-4" v-if="initCategories" v-for="item in initCategories">
          <div class="col-12 border h-100">
            <br>
            <div><p class="fw-bold">name :</p> {{ item.name }} </div>
            <br>
            <button class="btn btn-danger mt-4" @click="deleted(item.uuid)">delete</button>
            <br>
            <button class="btn btn-secondary mt-3 mb-3" @click="showEdit(item.uuid, item.name)">edit</button>

          </div>
        </div>
      </div>

      <div class="col-1 mt-5 d-flex justify-content-center">
        <div class="border h-100" style="width: 1px"></div>
      </div>

      <div class="row col-3 mt-5">
        <div class="col-12">
          <h1>Create</h1>
          <input class="col-12 mt-3" type="text" v-model="name" placeholder="name...">
          <button class="btn btn-success mt-4" @click="created(name)">create</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'Categories',
  data: function () {
    return {
      initCategories : null,
      EditIsActive : false,

      name : null,

      uuidEdit : null,
      nameEdit : null
    }
  },
  methods : {
    hideEdit(){
      document.body.style.overflow = '';
      this.EditIsActive = false;
    },
    created(name) {

      const category = {
        name: name
      };

      axios.post("http://127.0.0.1:8000/api/categories", category, {
        headers: {
          'Authorization': 'Bearer xYXSMCvS8TxHthN7L38QaLsamvLuAHp40mYHjkzn'
        }
      })
          .then(response => {
            alert('success create');
            location.reload();
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

    },
    showEdit(uuid, name){

      this.uuidEdit = uuid;
      this.nameEdit = name;

      document.body.style.overflow = 'hidden';
      window.scrollTo(0,0);

      this.EditIsActive = true;

    },
    deleted(uuid) {

      var result = confirm("Want to delete?");
      if (result) {

        axios
            .delete("http://127.0.0.1:8000/api/categories/" + uuid, {
              headers: {
                'Authorization': 'Bearer 1APWZ799cVZgF7zxRgay9K50CICJZrHFnkr5IM3N'
              }
            })
            .then(response => {
              alert('success delete');
              location.reload();
            });

      }

    },
    edited(uuid, name) {

      const category = {
        name: name
      };

      axios.put("http://127.0.0.1:8000/api/categories/" + uuid, category, {
        headers: {
          'Authorization': 'Bearer xYXSMCvS8TxHthN7L38QaLsamvLuAHp40mYHjkzn'
        }
      })
          .then(response => {
            alert('success edit');
            location.reload();
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

    }
  },
  mounted: function () {

    axios.get("http://127.0.0.1:8000/api/categories")
      .then((response) => {
        this.initCategories = response.data.data;
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue : ' + error;
      });

  }
}

</script>

<style scoped>

</style>
