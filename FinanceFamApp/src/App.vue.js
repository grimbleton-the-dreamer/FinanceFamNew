import { ref } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const menuOpen = ref(false);
const isClosing = ref(false);
const burgerClosing = ref(false);
//Handles opening and closing of the navigation menu
function toggleMenu() {
    if (menuOpen.value) {
        isClosing.value = true; // Start the closing animation for the menu
        burgerClosing.value = true; // Start the closing animation for the burger
    }
    else {
        menuOpen.value = true;
        burgerClosing.value = false;
    }
}
function handleMenuAnimationEnd() {
    if (isClosing.value) {
        menuOpen.value = false; // Hide the menu after the slide-out animation ends
        isClosing.value = false;
    }
}
// Links to other pages in the site
const links = [
    { name: 'Home', path: '/home' },
    { name: 'Login', path: '/login' },
    { name: 'About', path: '/about' },
];
//Changes the layout of the open navigation menu on smaller screens
function navStyle() {
    if (window.screen.width > 1040) {
        return {};
    }
    else {
        return {
            'justify-content': 'flex-start',
            'padding-top': '4rem'
        };
    }
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
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
    __VLS_styleScopedClasses['li-icon-container'];
    __VLS_styleScopedClasses['open'];
    __VLS_styleScopedClasses['open'];
    __VLS_styleScopedClasses['open'];
    __VLS_styleScopedClasses['navigation-tabs'];
    __VLS_styleScopedClasses['nav-list'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    if (!__VLS_ctx.$route.path.includes('login')) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("wrapper") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleMenu) }, ...{ class: ("burger") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (({ 'line': true, 'open': __VLS_ctx.menuOpen, 'burger-closing': __VLS_ctx.burgerClosing })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (({ 'line': true, 'open': __VLS_ctx.menuOpen, 'burger-closing': __VLS_ctx.burgerClosing })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (({ 'line': true, 'open': __VLS_ctx.menuOpen, 'burger-closing': __VLS_ctx.burgerClosing })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ onAnimationend: (__VLS_ctx.handleMenuAnimationEnd) }, ...{ class: (({ 'nav-list': true, 'open': __VLS_ctx.menuOpen, 'closing': __VLS_ctx.isClosing })) }, ...{ style: ((__VLS_ctx.navStyle())) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("nav-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ("./assets/FinanceFamLogo.svg"), alt: ("Logo"), ...{ class: ("nav-logo") }, });
        for (const [link, index] of __VLS_getVForSourceType((__VLS_ctx.links))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((index)), ...{ style: (({ animationDelay: `${index * 0.1}s` })) }, });
            const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
            /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("navigation-tabs") }, to: ((link.path)), }));
            const __VLS_2 = __VLS_1({ ...{ class: ("navigation-tabs") }, to: ((link.path)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            (link.name);
            __VLS_nonNullable(__VLS_5.slots).default;
            var __VLS_5;
        }
    }
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.RouterView;
    /** @type { [typeof __VLS_components.RouterView, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_styleScopedClasses['wrapper'];
    __VLS_styleScopedClasses['burger'];
    __VLS_styleScopedClasses['line'];
    __VLS_styleScopedClasses['open'];
    __VLS_styleScopedClasses['burger-closing'];
    __VLS_styleScopedClasses['line'];
    __VLS_styleScopedClasses['open'];
    __VLS_styleScopedClasses['burger-closing'];
    __VLS_styleScopedClasses['line'];
    __VLS_styleScopedClasses['open'];
    __VLS_styleScopedClasses['burger-closing'];
    __VLS_styleScopedClasses['nav-list'];
    __VLS_styleScopedClasses['open'];
    __VLS_styleScopedClasses['closing'];
    __VLS_styleScopedClasses['nav-header'];
    __VLS_styleScopedClasses['nav-logo'];
    __VLS_styleScopedClasses['navigation-tabs'];
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
            menuOpen: menuOpen,
            isClosing: isClosing,
            burgerClosing: burgerClosing,
            toggleMenu: toggleMenu,
            handleMenuAnimationEnd: handleMenuAnimationEnd,
            links: links,
            navStyle: navStyle,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
