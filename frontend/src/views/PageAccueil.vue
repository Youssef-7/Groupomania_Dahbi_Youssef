<template>
<body>
<div class="container">
   <header>
      <nav>
       <div class="navBar">
            <div class="socialTitle">
                <img src="../assets/icon-left-font.png">
            </div>
            <div class="searchBar">
              <div class="search">
                <button type="submit" class="searchButton">
                 <fa icon="search"/>
                </button>
                <input type="text" class="searchTerm" placeholder="Rechercher">
            </div>
            </div>
            <div class="userButton dropdown" >
                <button type="submit" class="profilButton boutonmenuprincipal">
                <div class="imgProfilPublicationPart1" data-v-039c5b43=""><img src="https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F12.2F07.2F4cff230b-512f-4b1d-abbb-90bf253fa9f2.2Ejpeg/345x258/quality/80/crop-from/center/chuck-norris.jpeg" data-v-039c5b43=""></div>
                <fa icon ="chevron-down"/>
                </button>
                <div class="dropdown-child">
                 <a href="/books">Mon profil</a>
                 <a href="#">
                  <form method="POST" action="/logout">
                    <button type="submit" class="btn btn-primary">Log out</button>
                </form>
                </a>
                </div>  
            </div>   
        </div>
      </nav>
    </header>
    <div class="alert alert-danger" role="alert"></div>
    <section id="sectionPublication">
      <div class="publication">
        <form action="/books/add" method="post">
          <input  name="p_titre" class="createPost" value="" placeholder="Titre de la publication" type="text">
          <input name="p_text" class="createPost" value="" placeholder="Quoi de neuf ?" type="text">
          <input type="hidden" id="p_parent" name="p_parent" value="<%= 0 %>" >
          <input type="hidden" id="p_user_id" name="p_user_id" value="<%= 59 %>">
        <div class="sendPics">
          <!-- <i class="far fa-images"></i>  -->   <!-- a modifier -->
        </div>
        <div class="send">
            <button type="submit" class="sendPublication" value="Add"> Envoyer </button>
        </div>
        </form>
      </div>
    </section>
    <section id= "allPost">
    <div class="allPublication">
      <div class="publicationPost">
        <div class="profilPublication">
        <div class="flexPart2">
        <div class="flexPart1">
            <div class="imgProfilPublicationPart1">
              <img src="https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F12.2F07.2F4cff230b-512f-4b1d-abbb-90bf253fa9f2.2Ejpeg/345x258/quality/80/crop-from/center/chuck-norris.jpeg">
            </div>
          <div class="profilPublicationPart1">
            <h2>Chuck Norris</h2>
            <p>07/11/2021</p>
          </div>
        </div>
          <div class="profilPublicationPart2">
           <div><a class="btn btn-danger delete" onclick="return alert('Are You sure?')" href="../books/delete?p_id=<%=data[i].p_id%>">Delete</a>  </div>
          </div>
        </div>
        <div class="profilPublicationPost">
            <h1></h1>
            <p></p>
          <div class="profilPublicationPostImg">
            <img src="http://www.imcdb.org/i427377.jpg">
          </div>
          <div class="profilPublicationPostInter">
            <div class="profilPublicationPostInterDivLike">
              <div><i class="far fa-thumbs-up"></i></div>
              <p>J'aime</p>
            </div>
            <div class="profilPublicationPostInterDivCom">
              <div><i class="far fa-comment-dots"></i></div>
              <p>Commenter</p>
            </div>
          </div>
          <div class="commentZone">
            <div class="imgProfilPublicationPart1">
              <img src="https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F12.2F07.2F4cff230b-512f-4b1d-abbb-90bf253fa9f2.2Ejpeg/345x258/quality/80/crop-from/center/chuck-norris.jpeg">
            </div>
            <form>
              <input name="createPost" class="createPost" placeholder="Ecrivez un commentaire..." type="text">
            </form>
            <div class="mon commentaire"> mon commentaire</div>
          </div>
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
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
/*Menu deroulant*/
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
body{
    margin: 0px;
    padding: 0px;
    background-color: white;
}
a{ 
text-decoration: none; }
.navBar{
    display: flex;
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
    background-color: white;
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
    width: 100%;
    height: 50px;
    
}
.publication input{
    font-size: 14px;
    background-color: #F7F3F3;
    border:1px solid #F3F2F2;

}
/*.sendPics{
    width: 5%;
    padding-top: 15px;
    margin-right: 0px;
    text-align: center;
}
.sendPics i {
    font-size: 20px;
    color: #C3DBE1;
}*/

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
    font-family: 'calibri';
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
    background-color: white;
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
    font-family: "calibri";
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
    font-family: "calibri";
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
    font-family: "calibri";
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


</style>