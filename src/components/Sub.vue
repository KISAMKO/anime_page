<template>
    <p style="margin: 5px;">Id:</p>
    <el-input v-model="id" clearable></el-input>
    <p style="margin: 5px;">番名:</p>
    <el-input v-model="name" clearable></el-input>
    <p style="margin: 5px;">字幕组:</p>
    <el-input v-model="subtitle" clearable></el-input>
    <p style="margin: 5px;">链接:</p>
    <el-input v-model="link" clearable></el-input>
    <el-button style="margin: 5px 0;" @click="AddData()">添加订阅</el-button>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            id: 0,
            name: '',
            subtitle: '',
            link: ''
        };
    },
    methods: {
        async AddData() {
            await axios
                .post('/data/add_sub', { _id: this.id, name: this.name, subtitle: this.subtitle, link: this.link })
                .then((result) => { console.log(result.data); })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },

    }
}
</script>