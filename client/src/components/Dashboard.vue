<script setup lang="ts">
import { ref } from 'vue';
import type { SearchRequest, SearchResponse } from '@shared/types'
import {v2Search} from "../api";

const query = ref<string>('');
const page = ref<number>(1);
const size = ref<number>(10);
const regex = ref<boolean>(false);
const wildcard = ref<boolean>(false);
const de_dupe = ref<boolean>(true);

const results = ref<SearchResponse | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const searchData = async () => {
  const request: SearchRequest = {
    query: query.value,
    page: page.value,
    size: size.value,
    regex: regex.value,
    wildcard: wildcard.value,
    de_dupe: de_dupe.value,
  };
  try {
    loading.value = true;
    error.value = null;
    results.value = await v2Search(request);
  } catch (err) {
    error.value = 'Failed to fetch data. Please try again.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="search-form">
      <label>
        Query:
        <input v-model="query" placeholder="Search query" />
      </label>
      <label>
        Page:
        <input v-model.number="page" type="number" min="1" />
      </label>
      <label>
        Size:
        <input v-model.number="size" type="number" min="1" max="100" />
      </label>
      <label>
        <input type="checkbox" v-model="regex" />
        Regex
      </label>
      <label>
        <input type="checkbox" v-model="wildcard" />
        Wildcard
      </label>
      <label>
        <input type="checkbox" v-model="de_dupe" />
        De-dupe
      </label>
      <button @click="searchData">Search</button>
    </div>
    <div v-if="loading">Loading data...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="results">
      <p>Total: {{ results.total }} | Took: {{ results.took }} | Balance: {{ results.balance }}</p>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in results.entries" :key="entry.id">
          <td>{{ entry.id }}</td>
          <td>{{ entry.name?.join(', ') || '' }}</td>
          <td>{{ entry.username?.join(', ') || '' }}</td>
          <td>{{ entry.email?.join(', ') || '' }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.search-form label {
  display: flex;
  align-items: center;
  gap: 5px;
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