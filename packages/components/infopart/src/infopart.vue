<template>
    <div :style="{ paddingBottom: needMargin ? '72px' : 0 }">
        <div class="part">
            <div class="line"></div>
            <div class="text">{{ title }}</div>
            <slot name="append"></slot>
        </div>
        <div style="padding-top: 8px;">
            <slot></slot>


            <template v-for="(item, index) in secData" :key="item">
                <div style="margin-bottom: 32px;">
                    <div class="secPart">
                        <div class="secLine"></div>
                        <div v-if="secTitle" class="secText">{{ secTitle[index] }}</div>
                    </div>
                    <slot :name="item">

                    </slot>
                </div>
            </template>

        </div>
    </div>

</template>
<script setup lang="ts">
import { useSlots, ref } from 'vue';
const { title, secTitle, needMargin } = withDefaults(defineProps<{ title: string, secTitle?: string[], needMargin?: boolean }>(), {
    needMargin: true,
})
const COMPONENT_NAME = 'GcInfopart'
defineOptions({
    name: COMPONENT_NAME,
})
// const { title, secTitle, needMargin } = defineProps<{ title: string,secTitle?:string[],needMargin:boolean }>()
const slots = useSlots()
const secData = ref<string[]>([])
console.log(slots, 'sss')
console.log(Object.keys(slots), 'sss')
secData.value = Object.keys(slots).filter(item => item.startsWith('sec_'))

</script>
<style lang="scss">
.contain {}

.part {
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding-right: 8px;
}

.secPart {
    padding-bottom: 8px;
    display: flex;
    align-items: center;
}

.line {
    width: 4px;
    height: 12px;
    background: #2261e0;
    border-radius: 24px;
}

.secLine {
    width: 4px;
    height: 6px;
    background: #2261e0;
    border-radius: 11px;
}

.text {
    color: #333333;
    font-weight: bold;
    font-size: 16px;
    padding-left: 8px;
    padding-right: 8px;
    line-height: 1;
}

.secText {
    color: #666;
    font-weight: 600;
    font-size: 14px;
    padding-left: 8px;
    padding-right: 8px;
}
</style>