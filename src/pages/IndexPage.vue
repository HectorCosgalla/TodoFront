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
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import CoreServices from "src/boot/services/CoreServices";
//import { ref } from "vue";
defineOptions({
  name: "IndexPage",
});

const $q = useQuasar();

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
      push: true,
      rounded: true,
      color: "negative",
    },
    persistent: true,
  })
    .onOk((data) => {
      console.log("adding:" + data);
      CoreServices.post({ name: data });
    })
    .onCancel(() => {
      // console.log("Something was canceled! \:\(");
    });
}
</script>
