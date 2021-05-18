<template>

  <div id="edit" v-if="EditIsActive" class="position-absolute top-50 start-50 translate-middle" style="z-index: 1;">
    <div style="height: 60vh; width: 60vw;" class="bg-white border">
        <h1 class="mt-5 mb-5">Edit</h1>
        <div class="col-7 mt-3 row align-items-center m-auto">
          <p class="col-12 p-0 m-0">Uuid : {{uuidEdit}}</p>
        </div>
        <input class="col-7 mt-3" type="text" v-model="firstnameEdit" placeholder="firstname...">
        <input class="col-7 mt-3" type="text" v-model="lastnameEdit" placeholder="lastname...">
        <div class="col-7 mt-3 row align-items-center m-auto">
          <p class="col-4 p-0 m-0">birthdate :</p>
          <input class="col-8" type="date" v-model="birthdateEdit">
        </div>
        <div class="col-7 mt-3 row align-items-center m-auto">
        <p class="col-4 p-0 m-0">death date :</p>
        <input class="col-8" type="date" v-model="death_dateEdit">
      </div>

      <button class="btn btn-secondary mt-4" @click="edited(uuidEdit, firstnameEdit, lastnameEdit, birthdateEdit, death_dateEdit)">edit</button>
    </div>
  </div>

  <div id="editBackground" @click="hideEdit" v-if="EditIsActive" class="position-absolute top-50 start-50 translate-middle" style="height: 100vh; width: 100vw; background-color: #0000004d; z-index: 0;"></div>

  <div class="container-fluid row d-flex justify-content-center">
    <h1>Authors</h1>

    <div class="row col-12 mb-5">

      <div class="row col-8">

        <div class="col-12">
          <button class="btn btn-sort ms-3" @click="SortAuthorsByBirthdates" :class="{active: BirthdatesIsActive}">Desc birthdate</button>
        </div>

        <div class="col-3 mt-4" v-if="sortAuthors" v-for="item in sortAuthors">
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

            <button class="btn btn-danger mt-4" @click="deleted(item.uuid)">delete</button>
            <br>
            <button class="btn btn-secondary mt-3 mb-3" @click="showEdit(item.uuid, item.firstname, item.lastname, item.birthdate, item.death_date)">edit</button>

          </div>
        </div>

        <div class="col-3 mt-4" v-else="sortAuthors" v-for="item in initAuthors">
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

            <button class="btn btn-danger mt-4" @click="deleted(item.uuid)">delete</button>
            <br>
            <button class="btn btn-secondary mt-3 mb-3" @click="showEdit(item.uuid, item.firstname, item.lastname, item.birthdate, item.death_date)">edit</button>

          </div>
        </div>
      </div>

      <div class="col-1 mt-5 d-flex justify-content-center">
        <div class="border h-100" style="width: 1px"></div>
      </div>

      <div class="row col-3 mt-5">
        <div class="col-12">
          <h1>Create</h1>
          <input class="col-12 mt-3" type="text" v-model="firstname" placeholder="firstname...">
          <input class="col-12 mt-3" type="text" v-model="lastname" placeholder="lastname...">
          <div class="col-12 mt-3 row align-items-center m-auto">
            <p class="col-4 p-0 m-0">birthdate :</p>
            <input class="col-8" type="date" v-model="birthdate">
          </div>
          <div class="col-12 mt-3 row align-items-center m-auto">
            <p class="col-4 p-0 m-0">death date :</p>
            <input class="col-8" type="date" v-model="death_date">
          </div>

          <button class="btn btn-success mt-4" @click="created(firstname, lastname, birthdate, death_date)">create</button>

        </div>
      </div>

    </div>

  </div>
</template>

<script>

import axios from "axios"

import ViewTab from '@/components/Authors/ViewTab';

export default {
  name: 'Authors',
  components: {
    ViewTab
  },
  data: function () {
    return {
      initAuthors : null,
      sortAuthors: null,
      BirthdatesIsActive : false,
      EditIsActive : false,

      firstname : null,
      lastname : null,
      birthdate : null,
      death_date : null,

      uuidEdit : null,
      firstnameEdit : null,
      lastnameEdit : null,
      birthdateEdit : null,
      death_dateEdit : null
    }
  },
  methods : {
    hideEdit(){
      document.body.style.overflow = '';
      this.EditIsActive = false;
    },
    SortAuthorsByBirthdates() {
      this.BirthdatesIsActive = this.BirthdatesIsActive !== true;

      const Authors = JSON.parse(JSON.stringify(this.initAuthors));

      if (this.BirthdatesIsActive === true){
        this.sortAuthors = Authors.sort(function(a,b){ return new Date(b.birthdate) - new Date(a.birthdate); });
      }else{
        this.sortAuthors = Authors;
      }
    },
    created(firstname, lastname, birthdate, death_date) {

      const author = {
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        death_date: death_date
      };

      axios.post("http://127.0.0.1:8000/api/authors", author, {
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
    showEdit(uuid, firstname, lastname, birthdate, death_date){



      var NewBirthdate = new Date(birthdate);

      if (death_date != null){
        var NewDeath_date = new Date(death_date);
      }

      this.uuidEdit = uuid;
      this.firstnameEdit = firstname;
      this.lastnameEdit = lastname;
      this.birthdateEdit = new Date(NewBirthdate).toString("yyyy-MM-d");
      this.death_dateEdit = new Date(NewDeath_date).toString("yyyy-MM-d");

      document.body.style.overflow = 'hidden';
      window.scrollTo(0,0);

      this.EditIsActive = true;

    },
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

    },
    edited(uuid, firstname, lastname, birthdate, death_date) {

      if (death_date == '0NaN-aN-NaN'){
        death_date = null;
      }

      const author = {
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        death_date: death_date
      };

      axios.put("http://127.0.0.1:8000/api/authors/" + uuid, author, {
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

    axios.get("http://127.0.0.1:8000/api/authors")
      .then((response) => {
        this.initAuthors = response.data.data;
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue : ' + error;
      });

  }
}

</script>

<style scoped>

</style>
