<template>
    <el-input v-model="keyword" class="w-50 m-2" size="large" placeholder="搜索...">
        <template #append>
            <el-button :loading="this.isLoading" @click="checkUpdate()">刷新</el-button>
        </template>
    </el-input>
    <el-table :data="tableData" :row-class-name="show_data">
        <el-table-column prop="name" label="标题"></el-table-column>
        <el-table-column prop="ep" label="集数"></el-table-column>
        <el-table-column prop="pub_date" label="发布时间"></el-table-column>
        <el-table-column prop="magnet" label="磁力">
            <template v-slot="scope">
                <el-button class="btn" :data-clipboard-text="scope.row.magnet" @click="copy()">
                    <el-icon><Magnet /></el-icon>
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="torrent" label="BT">
            <template v-slot="scope">
                <el-button class="btn" :data-clipboard-text="scope.row.torrent" @click="copy()">
                    <el-icon><Link /></el-icon>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page" :page-size="size"
        :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</template>

<script>
import axios from 'axios'
import Clipboard from 'clipboard'
import { Magnet,Link } from '@element-plus/icons-vue'
export default {
    data() {
        this.GetData();
        return {
            page: 1, //第几页
            size: 10, //一页多少条
            total: 100, //总条目数
            keyword: '',
            isLoading: false,
            tableData: [], //表格绑定的数据
            allData: []
        };
    },
    methods: {
        async GetData() {
            await axios
                .get('/data/new_episode')
                .then((result) => { this.allData = result.data; console.log(this.allData); this.getTabelData(); })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },
        //获取表格数据，自行分页(slice)
        async GetNewData() {
            await axios
                .post('/data/sub_update')
                .then((result) => { this.allData = result.data; console.log(this.allData);this.isLoading="false"; this.getTabelData(); })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },
        //修改isLoading值，发送请求
        checkUpdate(){
            this.isLoading="true";
            this.GetNewData();
        },
        getTabelData() {
            //allData为全部数据
            this.tableData = this.allData.slice(
                (this.page - 1) * this.size,
                this.page * this.size
            );
            this.total = this.allData.length
        },
        show_data({ row, rowIndex }) {
            if (rowIndex % 2 == 0) {
                return 's-row';
            } else {
                return 'd-row';
            }
        },
        currentChange(val) {
            this.page = val;
            this.getTabelData();
        },
        sizeChange(val) {
            this.size = val;
            this.page = 1;
            this.getTabelData();
        },
        copy() {
            var clipboard = new Clipboard('.btn');
            clipboard.on('success', function (e) {
                console.log(e);
            });
            clipboard.on('error', function (e) {
                console.log(e);
            });
        },
    },
}
</script>