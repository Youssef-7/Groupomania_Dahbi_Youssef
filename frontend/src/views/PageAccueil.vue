<template>
    <body>
        <div class="container">
         <header>
          <nav>
             <div class="navBar">
                <div class="socialTitle">
                    <img src="../assets/icon-left-font.png" alt="logo"> 
                </div>
                <div class="userButton dropdown" >
                    <button type="submit" class="profilButton boutonmenuprincipal">
                        <div class="imgProfilPublicationPart1" data-v-039c5b43=""><img src="../assets/avatar.png" alt="avatar"></div>
                        <fa icon ="chevron-down"/>
                    </button>
                    <div class="dropdown-child">
                      <form method="POST" action="/logout">
                        <button type="submit" class="btn btn-primary" @click="logout">Log out</button>
                    </form>

                </div>  
            </div>   
        </div>
    </nav>
</header>
<div class="alert alert-danger" role="alert"></div>
<section id="sectionPublication">
  <div class="publication">
    <form>
      <input v-model="front_title" name="front_title" class="createPost"  placeholder="Titre de la publication" type="text">
      <input v-model="front_content" name="front_content" class="createPost" placeholder="Quoi de neuf ?" type="text">
      <input @change="readURL"  type="file" >
      <div class="sendPics">
      </div>
      <div class="send">
        <button @click="savePublication" type="submit" class="sendPublication" value="Add"> Envoyer </button>
    </div>
</form>
</div>
</section>
<section id= "allPost">
    <div class="allPublication">
      <div class="publicationPost">
        <div class="profilPublication" v-for="item in items" :key="item.u_id">
            <div class="flexPart2">
                <div class="flexPart1">
                    <div class="imgProfilPublicationPart1">
                      <img src="../assets/avatar.png" alt="avatar">
                  </div>
                  <div class="profilPublicationPart1">
                    <h2>{{ item.u_pseudo }}</h2>
                </div>
            </div>
            <div class="profilPublicationPart2">
             <div v-if ="user == item.p_user_id || level === '1'" ><button class="btn btn-danger delete" v-on:click="deletePub(item.p_id)">Delete</button>  </div>
         </div>
     </div>
     <div class="profilPublicationPost" >
        <h1 >{{ item.p_titre }}</h1>
        <p>{{ item.p_text }}</p>
        <div v-if="item.p_image_url" class="profilPublicationPostImg">
            <img :src="'http://localhost:3000/' + item.p_image_url" >
        </div>
        <div class="profilPublicationPostInter">
        </div>
        <div v-if ="user == item.p_user_id || level == '1'">
          <button v-if ="mode == 'normal'" class="btn modify" @click="modifyMode">Modifier la publication</button>
          <button v-else class="btn LeaveModify" @click="normalMode">Quitter la modification</button>
      </div>
      <input v-if ="user == item.p_user_id && mode == 'modify'|| level == '1' && mode == 'modify' " v-model="front_title" name="front_title" class="createPost"  placeholder="Titre de la publication" type="text" > 
      <input v-if ="user == item.p_user_id && mode == 'modify'|| level == '1' && mode == 'modify'" v-model="front_content"  name="front_content" class="createPost" placeholder="Quoi de neuf ?" type="text"> 
      <input v-if ="user == item.p_user_id && mode == 'modify'|| level == '1' && mode == 'modify' "  type="file"  @change="readURL">
      <button v-if ="user == item.p_user_id || level === '1' && mode == 'modify'" v-on:click="modifPub(item.p_id)" class="btnModifPub">modifier</button>
      <button  v-on:click="likePub(item.p_id)" class="btnLikePub">liker</button>
      <button  v-on:click="dislikePub(item.p_id)" class="btnDislikePub">disliker</button>
      <p>Nombre de like {{item.p_like}}</p>
  </div>
</div>
</div>
</div>
</section>
<footer>
</footer>
</div>
</body>
</template>
<script>
// import axios

import axios from "axios"

export default {
  data() {
    return {
      items: [],
      p_id: "",
      front_p_user_id:"",
      front_title: "",
      front_content: "",
      front_parent : 0,
      front_user_id :"",
      user : localStorage.getItem("userId"),
      level : localStorage.getItem("level"),
      front_picture_url:"",
      mode : "normal",
};
},
created() {
    this.getProducts();
},
methods: {
normalMode(){
    this.mode = "normal";

},
modifyMode(){
    this.mode = "modify";
},
async getProducts() {
    const access_token = localStorage.getItem("access_token");
    var config = {
    method: "get",
    url: "http://localhost:3000/api/topic_messages/parent" ,
    headers: { Authorization: "Bearer " + access_token },
};
    const response = await axios(config);
    this.items = response.data
    console.log(this.items)
},
  savePublication(e) {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("userId");
    const data_image = new FormData();
    data_image.append("image", this.front_picture_url);
    console.log(data_image)
    const body = {
    p_titre: this.front_title,
    p_text: this.front_content,
    p_parent: "0",
    p_user_id: user_id,
    };
    data_image.append("topic", JSON.stringify(body));
    console.log(data_image)
    var config = {
    method: "post",
    url: "http://localhost:3000/api/topic_messages",
    headers: {
    Authorization: "Bearer " + access_token,
    "Content-Type": "multipart/form-data",
},
      data: data_image,
};
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      this.$router.go();
  })
    .catch(function (error) {
     console.log(error);
});
},
modifPub(p_id) {
    const access_token = localStorage.getItem("access_token");
    const data_image = new FormData();
    data_image.append("image", this.front_picture_url);
    console.log(data_image)
    const body = {
    p_titre: this.front_title,
    p_text: this.front_content,

};
    data_image.append("topic", JSON.stringify(body));
    console.log(data_image)
    var config = {
    method: "put",
    url: "http://localhost:3000/api/topic_messages/"+p_id,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "multipart/form-data",
},
    data: data_image,
};
    axios(config)
    .then((response) => {
     console.log(JSON.stringify(response.data));
    this.$router.go();
})
    .catch(function (error) {
     console.log(error);
});
},
readURL(e) {this.front_picture_url = e.target.files[0]},

likePub(p_id) {
    const user_id = localStorage.getItem("userId");
    const access_token = localStorage.getItem("access_token");
    const data_i = new FormData();
    const body = {
      like_u_id: user_id,
};
    data_i.append("topic", JSON.stringify(body));
    console.log(body)
    var config = {
    method: "post",
    url: "http://localhost:3000/api/topic_messages/like/"+ p_id,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "multipart/form-data",
},
    data: data_i,
};
    axios(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    this.$router.go();
})
    .catch(function (error) {
    console.log(error);
});
},

dislikePub(p_id) {
    const user_id = localStorage.getItem("userId");
    const access_token = localStorage.getItem("access_token");
    const data_i = new FormData();
    const body = {
      like_u_id: user_id,
};
    data_i.append("topic", JSON.stringify(body));
    console.log(body)
    var config = {
    method: "delete",
    url: "http://localhost:3000/api/topic_messages/dislike/"+ p_id,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "multipart/form-data",
},
  data: data_i,
};
    axios(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    this.$router.go();
    this.$router.go();
})
    .catch(function (error) {
    console.log(error);
});
},
deletePub(p_id){
    const access_token = localStorage.getItem("access_token");
    var config = {
      method: "delete",
      url: 'http://localhost:3000/api/topic_messages/'+ p_id,
      headers: { Authorization: "Bearer " + access_token },
};
    axios(config);
    this.$router.go();
},
logout(){
    localStorage.clear();
    this.$router.push("/");
},
},
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
/*Menu deroulant*/
.container, input, button {
font-family: 'Lato','sans-serif', 'cursive';
}
.profilButton{
float: right;
padding: 0 10px;
border: none;
}
.boutonmenuprincipal {
background-color: white;
border: none;
cursor: pointer;
}
.dropdown {
margin-left: 100px;
display: inline-block;
}
.dropdown-child {
position: fixed;
top: 70px;
display: none;
background-color: #f28c8c;
min-width: 50px;
}
.dropdown-child a {
color: white;
padding: 20px;
text-decoration: none;
display: block;
}
.dropdown:hover .dropdown-child {
display: block;
}
/**************************************/ 
body {
background-color: #FFD7D7;
margin: 0px !important;
padding: 0px !important;
}
a{ 
text-decoration: none; }
.navBar{
display: flex;
justify-content: space-between;
width: 100%;
background-color: white;
box-shadow: 1px 8px 5px -9px rgba(0,0,0,0.39);
margin: 0;
}
/*logo*/
.socialTitle {
width: 300px;
height: 70px;
margin-right: 120px;

}
.socialTitle img{
object-fit: cover;
width: 300px;
height: 70px;

}
/***barre de recherche***/
/*bloc*/
.searchBar{
width: 40%;
padding-top: 20px;
padding-right: 15px;
/*barre de recherche*/
}
.search {
width: 100%;
position: relative;
display: flex;
}
.searchTerm {
width: 100%;
border: 3px solid #EFEEEE;
border-left: none;
padding: 5px;
height: 20px;
border-radius: 0px 5px 5px 0px;
outline: none;
color: #9DBFAF;
}
.searchTerm:focus{
color: #A9A9A9;
}
.searchButton {
width: 40px;
height: 36px;
border: 3px solid #EFEEEE;
border-right: none;
background: #DFDFDF;
color: #fff;
border-radius: 5px 0px 0px 5px;
cursor: pointer;
font-size: 20px;
}
.publication{
width: 50%;
padding: 10px;
background-color: #4E5166;
margin: 50px auto;
border: 1px solid #E3E3E3;
border-radius: 9px;
display: flex;  
}
form {
width: 100%;
margin-right: 30px;
}
.createPost{
width: 95%;
height: 50px;
}
.publication input{
font-size: 14px;
background-color: #F7F3F3;
border:1px solid #F3F2F2;
}
.send{
width: 30%;
padding-top: 10px;
margin: auto;
}
.send button {
width: 100%;
padding: 12px;
border: none;
border-radius: 15px;
background-color: #FBEAA2;
font-weight: bold;
cursor: pointer;
}
#allPost{
display: flex;
flex-direction: row;
justify-content: center;
}
.allPublication{
min-height: 400px;
width: 600px;
display: flex;
flex-direction: column;
justify-content: space-between;
}
#userPublication1{
width: 50%;
}
.titrePublications{
margin-top: 20px;
width: 100%;
height: 20%;
border-radius: 10px;
background-color: white;
border-bottom: 1px solid #D3D0D0;
}
.titrePublications h1{
padding-top: 20px;
padding-left: 20px;
}
.profilPublication{
width: 100%;
background-color: #4E5166;
color: white;
margin-top: 0;
box-shadow: 0px 0px 8px -2px #B4B4B4;
border-radius: 10px;
margin-bottom: 50px;
}
.flexPart1{
display: flex;
}
.imgProfilPublicationPart1{
margin-top: 10px;
margin-left: 10px;
margin-right: 8px;
width: 50px;
height: 50px;
border-radius: 50%;
background-color: black;
}
.imgProfilPublicationPart1 img{
width: 100%;
height: 100%;
border-radius: 50%;
}
.profilPublicationPart1{
padding-top: 10px;
min-width: 10%;
}
.profilPublicationPart1 h1,p{
margin-top: 0;
margin-bottom: 0;
}
.profilPublicationPart1 h2{
margin: 0px;
}
.profilPublicationPart1 p{
width :80px
}
.flexPart2{
display: flex;
justify-content: space-between;
}
.profilPublicationPart2{
padding-top: 10px;
width: 50px;
height: 50px;
}
.profilPublicationPost p{
margin: 5px 10px;
word-wrap: break-word;
}
.profilPublicationPostImg{
margin-top: 20px;
width: 100%;
height: 200px;
}
.profilPublicationPostImg img{
width: 100%;
height: 100%;
object-fit: cover;
}
.profilPublicationPostInter{
display: flex;
margin: 20px 40px;
border-top: 1px solid #D3D0D0;
padding-top: 10px;
}
.profilPublicationPostInterDivCom{
display: flex;
margin-left: 40%;
}
.profilPublicationPostInterDivLike{
display: flex;
}
.commentZone{
display: flex;
justify-content: center;
border-top: 1px solid #D3D0D0;
padding-top: 10px;
padding-bottom: 10px;
}
.commentZone input{
border-radius: 20px;
border: solid 2px #D3D0D0;
}
.imgProfilPublicationPart1 img{
border-radius: 50%;
object-fit: cover;
}
@media all and (max-width: 1080px){
.socialTitle img{
width: 200px;
}
.socialTitle{margin-right: 0px;}
.searchBar{display: none;}
.allPublication{
width: 100%;
}
body{
width: 100%;
}
}
.publication{width: 80%;}
/*...............btn---style--------------------*/
.delete{
cursor: pointer;
background-color: #ed3535;
color: white;
border-radius: 20px;
border: none;
}
.modify{
border: none;
background-color: #4E5166;
color: wheat;
}
.LeaveModify{
border: none;
background-color: #4E5166;
color: azure;
}
.btnModifPub{
background-color: #4dc164;
border: none;
color: white;
cursor: pointer;
}
.btnLikePub{
background-color: #56b1d9;
border: none;
color: white;
cursor: pointer;
}
.btnDislikePub{
background-color: #d50c6d;
border: none;
color: white;
cursor: pointer;
}
</style>
