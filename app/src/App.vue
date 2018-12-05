<template>
<div>
  <RouterView></RouterView>
  </div>
</template>

<style>
h2 {
  background-color: rgb(65,63,64);
  color: white;
  margin: 0;
  padding: 20px;
  font-weight: bold;
}
body {
  margin: 0;
  text-align: center;
}
label {
  margin: 5px;
}
ul {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr)
}
li {
  padding: 20px;
}
h3 {
  background-color: rgb(192,91,88);
  color: white;
  margin: 0;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
}
form {
  background-color: rgba(82,85,99, 0.2);}
</style>
