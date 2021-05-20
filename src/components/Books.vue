<template>

  <div id="edit" v-if="EditIsActive" class="position-absolute top-50 start-50 translate-middle" style="z-index: 1;">
    <div style="height: 60vh; width: 60vw;" class="bg-white border">
        <h1 class="mt-5 mb-3">Edit</h1>
        <div class="col-7 mt-3 row align-items-center m-auto">
          <p class="col-12 p-0 m-0">Uuid : {{uuidEdit}}</p>
        </div>
        <input class="col-7 mt-3" type="text" v-model="nameEdit" placeholder="name...">

        <select class="col-7 mt-3 p-1" v-model="authorUuidEdit">
          <option v-for="item in authors" v-bind:selected="item.uuid === authorUuidEdit">{{item.uuid}}</option>
        </select>

        <select class="col-7 mt-3 p-1" v-model="categoryUuidEdit">
          <option v-for="item in categories" v-bind:selected="item.uuid === categoryUuidEdit">{{item.uuid}}</option>
        </select>

        <select class="col-7 mt-3 p-1" v-model="statusEdit">
          <option>disponible</option>
          <option>non_edite</option>
          <option>en_cours_d_appro</option>
        </select>

        <div class="col-7 mt-3 row align-items-center m-auto">
          <p class="col-4 p-0 m-0">Publish date :</p>
          <input class="col-8" type="date" v-model="publishDateEdit">
        </div>

      <button class="btn btn-secondary mt-4" @click="edited(uuidEdit, nameEdit, authorUuidEdit, categoryUuidEdit, statusEdit, publishDateEdit)">edit</button>
    </div>
  </div>

  <div id="editBackground" @click="hideEdit" v-if="EditIsActive" class="position-absolute top-50 start-50 translate-middle" style="height: 100vh; width: 100vw; background-color: #0000004d; z-index: 0;"></div>

  <div class="container-fluid row d-flex justify-content-center mt-3">
    <h1>Books</h1>

    <div class="row col-12 mb-5">

      <div class="row col-8">

        <div class="col-12">
          <button class="btn btn-sort ms-3" @click="SortBooksByPublishDate" :class="{active: PublishDatesIsActive}">Desc publish date</button>
        </div>

        <div class="col-3 mt-4" v-if="sortBooks" v-for="item in sortBooks">
          <div class="col-12 border h-100">
            <br>
            <div><p class="fw-bold">name :</p> {{ item.name }} </div>
            <br>
            <div v-if="item.category"><p class="fw-bold">Category :</p> {{ item.category.name }} </div>
            <div v-else="item.category"><p class="fw-bold">Category :</p> No value </div>
            <br>
            <div v-if="item.author"><p class="fw-bold">Author :</p> {{ item.author.firstname }} </div>
            <div v-else="item.author"><p class="fw-bold">Author :</p> No value </div>
            <br>
            <div><p class="fw-bold">status :</p> {{ item.status }} </div>
            <br>
            <div><p class="fw-bold">publishDate :</p> {{ item.publish_date }} </div>

            <button class="btn btn-danger mt-4" @click="deleted(item.uuid)">delete</button>
            <br>
            <button class="btn btn-secondary mt-3 mb-3" @click="showEdit(item.uuid, item.name, item.author.uuid, item.category.uuid, item.status, item.publish_date)">edit</button>

          </div>
        </div>

        <div class="col-3 mt-4" v-else="sortBooks" v-for="item in initBooks">
          <div class="col-12 border h-100">
            <br>
            <div><p class="fw-bold">name :</p> {{ item.name }} </div>
            <br>
            <div v-if="item.category"><p class="fw-bold">Category :</p> {{ item.category.name }} </div>
            <div v-else="item.category"><p class="fw-bold">Category :</p> No value </div>
            <br>
            <div v-if="item.author"><p class="fw-bold">Author :</p> {{ item.author.firstname }} </div>
            <div v-else="item.author"><p class="fw-bold">Author :</p> No value </div>
            <br>
            <div><p class="fw-bold">status :</p> {{ item.status }} </div>
            <br>
            <div><p class="fw-bold">publishDate :</p> {{ item.publish_date }} </div>

            <button class="btn btn-danger mt-4" @click="deleted(item.uuid)">delete</button>
            <br>
            <button class="btn btn-secondary mt-3 mb-3" @click="showEdit(item.uuid, item.name, item.author.uuid, item.category.uuid, item.status, item.publish_date)">edit</button>

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

          <select class="col-12 mt-3 p-1" v-model="authorUuid">
            <option value="authorUuid" disabled selected>author Uuid...</option>
            <option v-for="item in authors">{{item.uuid}}</option>
          </select>

          <select class="col-12 mt-3 p-1" v-model="categoryUuid">
            <option value="categoryUuid" disabled selected>category Uuid...</option>
            <option v-for="item in categories">{{item.uuid}}</option>
          </select>

          <select class="col-12 mt-3 p-1" v-model="status">
            <option value="status" disabled selected>status...</option>
            <option>disponible</option>
            <option>non_edite</option>
            <option>en_cours_d_appro</option>
          </select>

          <div class="col-12 mt-3 row align-items-center m-auto">
            <p class="col-4 p-0 m-0">Publish date :</p>
            <input class="col-8" type="date" v-model="publishDate">
          </div>

          <button class="btn btn-success mt-4" @click="created(name, authorUuid, categoryUuid, status, publishDate)">create</button>

        </div>
      </div>

    </div>

  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'Books',
  data: function () {
    return {
      initBooks : null,
      sortBooks: null,
      categories : null,
      authors : null,
      PublishDatesIsActive : false,
      EditIsActive : false,

      name : null,
      authorUuid : 'authorUuid',
      categoryUuid : 'categoryUuid',
      status : 'status',
      publishDate : null,

      uuidEdit : null,
      nameEdit : null,
      authorUuidEdit : null,
      categoryUuidEdit : null,
      statusEdit : null,
      publishDateEdit : null
    }
  },
  methods : {
    hideEdit(){
      document.body.style.overflow = '';
      this.EditIsActive = false;
    },
    SortBooksByPublishDate() {
      this.PublishDatesIsActive = this.PublishDatesIsActive !== true;

      const Books = JSON.parse(JSON.stringify(this.initBooks));

      if (this.PublishDatesIsActive === true){
        this.sortBooks = Books.sort(function(a,b){ return new Date(b.publish_date) - new Date(a.publish_date); });
      }else{
        this.sortBooks = Books;
      }

    },
    created(name, authorUuid, categoryUuid, status, publishDate) {
      const book = {
        name: name,
        author_id: authorUuid,
        categories_id: categoryUuid,
        status: status,
        publish_date: publishDate
      };

      axios.post("http://127.0.0.1:8000/api/books", book, this.$store.state.header)
          .then(response => {
            alert('success create');
            location.reload();
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

    },
    showEdit(uuid, name, authorUuid, categoryUuid, status, publishDate){

      console.log('authorUuid ' + authorUuid);
      console.log('categoryUuid ' + categoryUuid);

      var NewPublishDate = new Date(publishDate);

      this.uuidEdit = uuid;
      this.nameEdit = name;
      this.authorUuidEdit = authorUuid;
      this.categoryUuidEdit = categoryUuid;
      this.statusEdit = status;
      this.publishDateEdit = new Date(NewPublishDate).toString("yyyy-MM-d");

      document.body.style.overflow = 'hidden';
      window.scrollTo(0,0);

      this.EditIsActive = true;

    },
    deleted(uuid) {

      var result = confirm("Want to delete?");
      if (result) {

        axios
            .delete("http://127.0.0.1:8000/api/books/" + uuid, this.$store.state.header)
            .then(response => {
              alert('success delete');
              location.reload();
            });

      }

    },
    edited(uuid, name, authorUuid, categoryUuid, status, publishDate) {

      const book = {
        name: name,
        author_id: authorUuid,
        categories_id: categoryUuid,
        status: status,
        publish_date: publishDate
      };

      axios.put("http://127.0.0.1:8000/api/books/" + uuid, book, this.$store.state.header)
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
  mounted() {

    axios.get("http://127.0.0.1:8000/api/books")
      .then((response) => {
        this.initBooks = response.data.data;
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue : ' + error;
    });

    axios.get("http://127.0.0.1:8000/api/categories")
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          this.error = 'Une erreur est survenue : ' + error;
        });

    axios.get("http://127.0.0.1:8000/api/authors")
        .then((response) => {
          this.authors = response.data.data;
        })
        .catch((error) => {
          this.error = 'Une erreur est survenue : ' + error;
        });

  }
}

</script>

<style scoped>

</style>
