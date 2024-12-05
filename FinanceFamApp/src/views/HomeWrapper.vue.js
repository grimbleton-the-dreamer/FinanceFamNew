import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { users as Users, assets as Assets, expenses as Expenses, goals as Goals } from '../stores/mockdata';
import {} from '../stores/types';
import Home from './Home.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const authStore = useAuthStore();
const userID = ref(authStore.currentUser?.userID ?? '');
const isAdmin = ref(false);
const users = ref(Users);
const managedUsers = ref([]);
function getManagedUsers() {
    const user = users.value.find(e => e.userID === authStore.currentUser?.userID);
    console.log("USER: ", user);
    if (user?.role === "admin") {
        isAdmin.value = true;
        managedUsers.value = users.value.filter(e => String(e.adminID) === userID.value);
        console.log("MANAGED USERS", managedUsers.value);
    }
    else {
        isAdmin.value = false;
        managedUsers.value = [];
    }
}
function test() {
    console.log(userID.value);
}
onMounted(() => {
    getManagedUsers();
}); /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    // @ts-ignore
    [Home, Home,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Home, new Home({ userId: ((__VLS_ctx.userID)), }));
    const __VLS_1 = __VLS_0({ userId: ((__VLS_ctx.userID)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    for (const [user] of __VLS_getVForSourceType((__VLS_ctx.managedUsers))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        // @ts-ignore
        [Home, Home,];
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(Home, new Home({ userId: ((user.userID)), }));
        const __VLS_6 = __VLS_5({ userId: ((user.userID)), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    }
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Home: Home,
            userID: userID,
            managedUsers: managedUsers,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
