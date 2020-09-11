<template>
  <header class="navbar">
      <div class="logo">
        <!--logo aqui-->
      </div>
      <div class="nav-buttons">
        <div class="nav-button">Início</div>
        <div class="nav-button">Bots</div>
        <div class="nav-button">Docs</div>
        <div class="nav-button">Servidor</div>
        <div class="nav-button">Equipe</div>
      </div>
      <div class="nav-button login-btn">Login <i class="fas fa-sign-in-alt"></i></div>
    </header>
  <router-view/>
</template>

<style>
body {
  margin: 0;
  height: 100%;
  background: var(--primary-background);
}

body.preload {
  transition: none !important;
}

*, input, button {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: none;
  margin: 0;
}

.navbar {
  z-index: 3;
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--navbar-height);
  background: var(--navbar-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*border-bottom: 1px solid var(--colors-border);*/
  box-shadow: var(--shadow);
}

.navbar .logo {
  fill: white;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo svg {
  max-width: 59px;
  max-height: var(--navbar-height);
  width: 100%;
  height: 100%;
}

.nav-buttons {
  display: flex;
}

.nav-buttons .nav-button {
  margin: 0 5px;
}

.nav-button {
  color: var(--nav-buttons-color);
  padding: 10px;
  transition: color .2s;
}

.nav-button:hover, .nav-button.active {
  color: var(--normal-color);
  cursor: pointer;
}

.login-btn i {
  margin-left: 5px;
  color: var(--icon-color);
  transform: translateY(.5px);
}
</style>
