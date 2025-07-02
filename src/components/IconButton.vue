<script setup lang="ts">
import { defineProps } from "vue";

type IconButtonProps = {
  onClick: () => void;
  icon: string;
  className?: string;
};

const { onClick, icon, className = '' } = defineProps<IconButtonProps>();

const iconClass = `pi ${icon}`;
const iconClassName = `p-4 rounded-full bg-blue cursor-pointer ${className}`;
</script>

<template>
  <div :className="iconClassName" @click="onClick">
    <i :class="iconClass" style="color: white; display: block"></i>
  </div>
</template>
