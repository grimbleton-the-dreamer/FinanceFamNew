<template>
    <div v-if="!$route.path.includes('login')" class="wrapper">
        <!-- Navigation menu -->
        <nav>
            <!-- Button to open the menu-->
            <button class="burger"
                    @click="toggleMenu">
                <div :class="{ 'line': true, 'open': menuOpen, 'burger-closing': burgerClosing }"></div>
                <div :class="{ 'line': true, 'open': menuOpen, 'burger-closing': burgerClosing }"></div>
                <div :class="{ 'line': true, 'open': menuOpen, 'burger-closing': burgerClosing }"></div>
            </button>
            <!-- Links -->
            <ul :class="{ 'nav-list': true, 'open': menuOpen, 'closing': isClosing }"
                @animationend="handleMenuAnimationEnd"
                :style="navStyle()">

                <div class="nav-header">
                    <img src="./assets/FinanceFamLogo.svg" alt="Logo" class="nav-logo">
                </div>

                <li v-for="(link, index) in links"
                    :key="index"
                    :style="{ animationDelay: `${index * 0.1}s` }">
                    <router-link class="navigation-tabs"
                                 :to="link.path">{{ link.name }}</router-link>
                </li>
            </ul>
        </nav>
    </div>
    <RouterView />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuOpen = ref<boolean>(false);
const isClosing = ref<boolean>(false);
const burgerClosing = ref<boolean>(false);

//Handles opening and closing of the navigation menu
function toggleMenu(): void {
    if (menuOpen.value) {
        isClosing.value = true; // Start the closing animation for the menu
        burgerClosing.value = true; // Start the closing animation for the burger
    } else {
        menuOpen.value = true;
        burgerClosing.value = false;
    }
}

function handleMenuAnimationEnd(): void {
    if (isClosing.value) {
        menuOpen.value = false; // Hide the menu after the slide-out animation ends
        isClosing.value = false; 
    }
}

// Links to other pages in the site
const links: Array<{ name: string; path: string; }> = [
    { name: 'Home', path: '/home' },
    { name: 'Login', path: '/login' },
    { name: 'About', path: '/about' },
];

//Changes the layout of the open navigation menu on smaller screens
function navStyle(): { [key: string]: string } {
    if (window.screen.width > 1040) {
        return {};
    } else {
        return {
            'justify-content': 'flex-start',
            'padding-top': '4rem'
        };
    }
}
</script>

<style lang="less" scoped>
.finance-logo {
    position: relative;
    bottom: 100%;
}

.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 1.5rem;
    background-color: #d0d0d0;
    width: 100%;

    .icons-group {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 2rem;

        .li-icon-container {
            display: inline-block;
            cursor: pointer;
            transition: transform 0.3s;
            margin-left: 1rem;
        }

        .li-icon-container:hover {
            transform: scale(1.1);
            background-color: inherit !important;
        }
    }
}

.burger {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    background-color: inherit;
    position: relative;
    z-index: 1000;

    .line {
        width: 25px;
        height: 1px;
        background-color: white;
        margin: 4px 0;
        transition: all 0.3s ease;

        &.open:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        &.open:nth-child(2) {
            opacity: 0;
        }

        &.open:nth-child(3) {
            transform: rotate(-45deg) translate(9px, -8px);
        }
    }
}

.navigation-tabs {
    display: block;
    width: 100%;
    color: white !important;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding-top: 2rem;

    .nav-list {
        list-style-type: none;
        display: flex;
        flex-direction: column; /* Stack the logo above the links */
    align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 9;
        background-color: rgba(0, 0, 0, 0.25);
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999;
        padding: 0;
        margin: 0;
        padding-bottom: 10rem;

        &.open {
            display: flex;
            animation: fadeIn 0.5s ease forwards, slideIn 0.5s ease forwards;
        }

        &.closing {
            animation: slideOut 0.5s ease forwards;
        }

        li {
            width: 100%;
            margin: 0.25rem 0;
            opacity: 0;
            transform: translateX(-100%);
            animation: slideIn 0.5s ease forwards;

            .navigation-tabs {
                display: block;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                text-align: center;

                /* Updated hover styles */
                &:hover {
                    background-color: rgba(0, 0, 0, 0.25);
                    color: white;
                    /* Ensure text is visible on black background */
                }
            }

            a {
                color: black;
                /* Set link text color */
                text-decoration: none;
            }
        }

        /* Remove or comment out conflicting hover styles */
        /* li:hover {
        background-color: rgba(125, 125, 125);
      } */
    }
}

@media (min-width: 1024px) {
    .nav-list {
        width: 300px;
        top: 0;
        left: 0;
        bottom: 0;
        right: unset;
        flex-direction: column;
    }
}

/* Animation for fading in */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* Animation for sliding in */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Animation for sliding out */
@keyframes slideOut {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(-100%);
    }
}

.nav-header {
    display: flex;
    justify-content: center; /* Center the logo horizontally */
    margin-bottom: 10px; /* Add spacing below the logo */
}

.nav-logo {
    position: relative;
    bottom: 50%;
    
}
</style>