<template>
  <q-page>
    <div class="row justify-end">
      <q-btn
        color="secondary"
        class="q-ma-sm"
        glossy
        rounded
        icon="add"
        label="Add a new task"
        @click="togleAddTask"
      />
      <q-btn
        color="secondary"
        class="q-ma-sm"
        label="tricky button"
        @click="tryGetAll"
      />
    </div>
    <!--<div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="id"
      />
    </div>-->
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import CoreServices from "src/boot/services/CoreServices";
import TaskServices from "src/boot/services/TaskServices";
import { ref } from "vue";
defineOptions({
  name: "IndexPage",
});

const $q = useQuasar();

const tasks = ref([])

function togleAddTask() {
  $q.dialog({
    title: "New Task",
    message: "Add a new task to the list of unfinished tasks:",
    prompt: {
      model: "",
      isValid: (val) => val.length > 0,
      type: "text",
    },
    ok: {
      glossy: true,
      rounded: true,
      color: "secondary",
    },
    cancel: {
      glossy: true,
      rounded: true,
      color: "negative",
    },
    persistent: true,
  })
    .onOk((data) => {
      console.log({ title: data});
      TaskServices.post({ title: data});
    })
    .onCancel(() => {
      // console.log("Something was canceled! \:\(");
    });
}

async function tryGetAll(){
  try {
    const response = TaskServices.getAll();
    tasks.value = (await response).data
  } catch (error) {
    console.log(error);
  }
  
}
</script>
  