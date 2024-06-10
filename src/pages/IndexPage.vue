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
        :columns="unfinished_columns"
        row-key="rows.id"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group push>
              <q-btn color="warning" glossy text-color="black" label="Edit" icon="edit" @click="onEdit(props.row)"/>
              <q-btn color="positive" glossy label="Done" :icon-right="gitlabTaskDone" @click="onDone(props.row)"/>
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
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

const gitlabTaskDone = 'M3 13.5a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h9.25a.75.75 0 000-1.5H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9.75a.75.75 0 00-1.5 0V13a.5.5 0 01-.5.5H3zm12.78-8.82a.75.75 0 00-1.06-1.06L9.162 9.177 7.289 7.241a.75.75 0 10-1.078 1.043l2.403 2.484a.75.75 0 001.07.01L15.78 4.68z@@fill-rule:evenodd;clip-rule:evenodd;|0 0 16 16'

const $q = useQuasar();

const tasks = ref([]);

const unfinished_tasks = ref([])
const finished_tasks = ref([])

const unfinished_columns = [
  {
    name:'title',
    align:'center',
    label:'title',
    field: row => row.title
  },
  {
    name:'actions',
    label:'Actions'
  }
];
const columns = [
  {
    name:'title',
    align:'left',
    label:'title',
    field: row => row.title
  }
];

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

function onEdit(task) {
  $q.dialog({
    title: "Edit Task",
    message: "Change the title of the task:",
    prompt: {
      model: task.title,
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
      $q.loading.show()
      unfinished_tasks.value.find((object) => object.id == task.id).title = data;
      await TaskServices.patch({id: task.id,title:data});
      $q.loading.hide();
    })
    .onCancel(() => {
    });
}

async function onDone(task){
  await TaskServices.patch({id:task.id})
  unfinished_tasks.value = []
  finished_tasks.value = []
  fillTheTable();
}
fillTheTable();
</script>
  