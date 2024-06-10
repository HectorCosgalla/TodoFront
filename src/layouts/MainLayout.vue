<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-red-10">
      <q-toolbar>
        <q-toolbar-title> ToDo App </q-toolbar-title>

        <div>By Hector Cosgalla</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "MainLayout",
});
</script>
