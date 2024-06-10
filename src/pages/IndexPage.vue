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
    </div>
    <div class="q-pa-md">
      <q-table
        title="Unfinished tasks"
        :rows="unfinished_tasks"
        :columns="columns"
        row-key="rows.id"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        title="Finished tasks"
        :rows="finished_tasks"
        :columns="columns"
        row-key="rows.id"
      />
    </div>
  </q-page>
</template>

<script setup>
import { format, useQuasar } from "quasar";
import TaskServices from "src/boot/services/TaskServices";
import { onMounted, onUpdated, ref } from "vue";
defineOptions({
  name: "IndexPage",
});

const $q = useQuasar();

const tasks = ref([]);

const unfinished_tasks = ref([])
const finished_tasks = ref([])

const columns = [
  {
    name:'id',
    required: true,
    align: 'left',
    label: 'id',
    field: row => row.id,
    format: val => `${val}`
  },
  {
    name:'title',
    align:'center',
    label:'title',
    field: row => row.title
  },
  {
    name:'isDone',
    label: 'Is done?',
    field: row => row.isDone
  }
];

const rows = ref([]);

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
    .onOk(async (data) => {
      const newTask = await TaskServices.post({ title: data});
      addATaskToTable(newTask);
    })
    .onCancel(() => {
    });
}

async function getAll(){
  try {
    tasks.value = (await TaskServices.getAll());
  } catch (error) {
    console.log(error);
  }
}

function sortTasks(){
  if (tasks.value.length != 0) {
    for (let i = 0; i < tasks.value.length; i++) {
      const task = tasks.value[i];
      if (!task.isDone) {
        unfinished_tasks.value.push(task);
      } else {
        finished_tasks.value.push(task);
      }
    }
    tasks.value = [];
  }
}

async function fillTheTable() {
  await getAll();
  sortTasks();
  console.log("The tables has been filled!");
}

function addATaskToTable(newTask){
  unfinished_tasks.value.push(newTask);
}

fillTheTable();
</script>
  