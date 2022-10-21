<template>
  <div class="container" style="max-width: 600px">
    <!-- Heading -->
    <h2 class="text-center mt-5">My Vue Todo App</h2>

    <!-- Input -->
    <div class="d-flex mt-5">
      <input type="text" v-model="task" placeholder="Enter task" class="w-100 form-control" />
      <button class="btn btn-warning rounded-0" @click="submitTask">
        SUBMIT
      </button>
    </div>
    <!--Filter Status-->
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
        style="margin-top:3%">
        Choose Status
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">To-do</a></li>
        <li><a class="dropdown-item" href="#">In progress</a></li>
        <li><a class="dropdown-item" href="#">Finished</a></li>
      </ul>
    </div>
    <!-- Task table -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col" style="width: 120px">Status</th>
          <th scope="col" class="text-center">Xóa</th>
          <th scope="col" class="text-center">Sửa</th>
        </tr>
      </thead>
      <tbody>
        {{tasks}}
        <tr v-for="(task, index) in tasks" :key="index">
          <td>
            <span :class="{ 'line-through': task.status === 'finished' }">
              {{ task.name }}
            </span>
          </td>
          <td>
            <span class="pointer noselect" @click="changeStatus(index)" :class="{
              'text-danger': task.status === 'to-do',
              'text-success': task.status === 'finished',
              'text-warning': task.status === 'in-progress',
            }">
              {{ capitalizeFirstChar(task.status) }}
            </span>
          </td>
          <td class="text-center">
            <div @click="deleteTask(index)">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
          <td class="text-center">
            <div @click="editTask(index)">
              <p class="fa fa-pen pointer"></p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    onMounted(() => {
      getApi();
    });
    /*GET API */
    //const tasks = ref([])

    // const getAllTodos = async () => {
    //   try {
    //     // const res = await axios.get(
    //     //   'https://jsonplaceholder.typicode.com/todos?_limit=5'
    //     // )
    //     console.log(this.tasks)
    //     //tasks.value = res.data
    //   } catch (error) {
    //     console.log(error)
    //   }
    const tasks = ref([]);
    // axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    //   .then(function (response) {
    //     // handle success
    //     tasks.value = response.data
    //     console.log(response.data);
    //     console.log("tvl",tasks.value);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    const getApi = () => {
      return axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(response => {
          tasks.value = response.data
          console.log("task", tasks.value);
        })
    }
    return { getApi, tasks }
    // }
    // getAllTodos()
  },

  data() {
    return {
      task: "",
      editedTask: null,
      statuses: ["to-do", "in-progress", "finished"],

      /* Status could be: 'to-do' / 'in-progress' / 'finished' */

    };
  },
  // mounted () {
  //   this.getApi();

  // },
  methods: {
    //get Api
    // async getApi() {
    //   await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //     console.log("taks:", this.tasks);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    // },
    /**
     * Capitalize first character
     */
    capitalizeFirstChar(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Change status of task by index
     */
    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.statuses[newIndex];
    },

    /**
     * Deletes task by index
     */
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },

    /**
     * Edit task
     */
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },

    /**
     * Add / Update task
     */
    submitTask() {
      if (this.task.length === 0) return;

      /* We need to update the task */
      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      } else {
        /* We need to add new task */
        this.tasks.push({
          name: this.task,
          status: "todo",
        });
      }

      this.task = "";
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.line-through {
  text-decoration: line-through;
}
</style>
