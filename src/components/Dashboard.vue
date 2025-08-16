<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type {User} from "../types";


const users = ref<User[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchData = async () => {
  try {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    users.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch data. Please try again.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Fetch data when the component mounts
onMounted(fetchData);
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div v-if="loading">Loading data...</div>
    <div v-else-if="error">{{ error }}</div>
    <table v-else>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>