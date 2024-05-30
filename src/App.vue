<template>
    <el-container>
        <el-aside width="150px">
            <el-menu router default-active="/" class="el-menu-vertical-demo">
                <el-menu-item index="/anime">
                    <el-icon><icon-menu /></el-icon>
                    <span>主页</span>
                </el-menu-item>
                <el-menu-item index="/sub">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>添加</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>订阅设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <RouterView />
        </el-main>
    </el-container>
</template>