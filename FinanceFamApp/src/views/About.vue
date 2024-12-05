<template>
    <div class="d-flex align-items-center justify-content-between home-page">
      <div class="d-flex flex-column">
        <div class="d-flex flex-column area-small">
          <div class="d-flex bg-green area-head">
            About Us
          </div>
          <div class="d-flex flex-column bg-blue about-content">
            <p class="about-text">
              Welcome to our financial management application! We are dedicated to providing a seamless solution for households with multiple occupants who need to manage their finances in one centralized location.
            </p>
            <h3 class="section-title">Our Mission</h3>
            <p class="about-text">
              Our mission is to simplify financial management for shared living spaces. We believe that managing expenses, budgets, and financial goals shouldn't be a hassle, especially when living with others.
            </p>
            <h3 class="section-title">The Problem We Solve</h3>
            <p class="about-text">
              In households with multiple people, keeping track of shared expenses and individual contributions can become complicated. Our application addresses this issue by offering an integrated platform where everyone can collaborate on financial planning, track expenses, and achieve collective financial goals.
            </p>
            <h3 class="section-title">How We Started</h3>
            <p class="about-text">
              The idea for this application was born out of a common challenge faced by many: coordinating finances among roommates or family members. Recognizing the lack of effective tools to manage this, we set out to create a user-friendly platform that brings transparency and ease to household financial management.
            </p>
            <h3 class="section-title">Our Team</h3>
            <p class="about-text">
              We are a group of passionate computer science students dedicated to making financial management accessible and straightforward. Combining our skills in software development, we aim to deliver a solution that meets the real-world needs of shared households.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No additional logic needed for this About page
  </script>
  
  <style scoped lang="less">
  .d-flex {
    display: flex;
  }
  
  .flex-column {
    flex-direction: column;
  }
  
  .align-items-center {
    align-items: center;
  }
  
  .justify-content-between {
    justify-content: space-between;
  }
  
  .bg-green {
    background-color: #78bd80;
  }
  
  .bg-blue {
    background-color: #6a93c1;
  }
  
  .home-page {
    width: 80%;
    margin-left: 20rem;
    margin-right: 10rem;
    margin-top: 5rem;
  }
  
  .area-small {
    width: 60vw;
    margin-bottom: 2vh;
    border-radius: 8px;
  }
  
  .area-head {
    font-family: 'Inter', sans-serif;
    color: white;
    font-size: 24px;
    font-weight: 700;
    font-style: italic;
    justify-content: center;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 0.25rem;
  }
  
  .about-content {
    padding: 20px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  
  .about-text {
    color: black;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  
  .section-title {
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  </style>
  