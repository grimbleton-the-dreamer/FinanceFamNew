<template>
    <Home :userId="userID"></Home>

    <div v-for="user in managedUsers">
        <Home :userId="user.userID"></Home>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { users as Users, assets as Assets, expenses as Expenses, goals as Goals } from '../stores/mockdata';
import { type User, type Asset, type Expense, type Goal } from '../stores/types'; 
import Home from './Home.vue';

const authStore = useAuthStore();
const userID = ref<string>(authStore.currentUser?.userID ?? '');
const isAdmin = ref<boolean>(false);
const users = ref<User[]>(Users);
const managedUsers = ref<User[]>([]);

function getManagedUsers(): void {
    const user = users.value.find(e => e.userID === authStore.currentUser?.userID);
    console.log("USER: ", user);
    if (user?.role === "admin") {
        isAdmin.value = true;
        managedUsers.value = users.value.filter(e => String(e.adminID) === userID.value);
        console.log("MANAGED USERS", managedUsers.value);
    } else {
        isAdmin.value = false;
        managedUsers.value = [];
    }
}

function test(): void {
    console.log(userID.value);
}

onMounted((): void => {
    getManagedUsers();
})
</script>

<style scoped lang="less">

</style>