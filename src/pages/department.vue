<template>
	<div class="department-wrapper">
    <g-list-search :columns="searchColumns" @search="handleSearch" @insert="handleInsert"></g-list-search>
    <g-list-grid :view="listView" @edit="handleEdit" @delete="handleDelete"></g-list-grid>
    <g-manage-dialog v-if="manageVisible" :view="manageView" :isEdit="isEdit" @close="handleCloseManage" @submit="handleSubmit"></g-manage-dialog>
	</div>
</template>

<script>
  import listData from '@/mock/department/listData'
  import pageInfo from '@/mock/department/pageInfo'
  import listColumns from '@/mock/department/listColumns'
  import searchColumns from '@/mock/department/searchColumns'
  import insertColumns from '@/mock/department/insertColumns'
  import editColumns from '@/mock/department/editColumns'

  export default {
    name: 'department',

    data() {
      return {
        // 当前列表视图对象
        listView: {
          datasource: {}
        },
        manageView: {}, // 当前新增或编辑视图对象
        searchColumns: [], // 搜索字段集合
        manageVisible: false,
        isEdit: false,
      }
    },

    created() {
      // 当前列表视图数据源
      let datasource = {
        reload: false,
        currentPage: 1,
        pageSize: 10
      }

      this.$set(this.listView, 'datasource', datasource);
      this.$set(this.listView, 'columns', listColumns);
      this.$set(this.listView, 'recordData', listData);
      this.$set(this.listView, 'pageInfo', pageInfo);
      this.$set(this, 'searchColumns', searchColumns);
    },

    methods: {
      // 搜索
      handleSearch(val) {
        console.log('查询', val);
        this.$set(this.listView.datasource, 'reload', true);

        // 模拟查询
        let mockList = [];
        if(val.name == '财务部') {
          mockList = [listData[0], listData[1]];
        } else {
          mockList = listData;
        }
        this.$set(this.listView, 'recordData', mockList);
      },

      // 打开新增
      handleInsert() {
        this.$set(this.manageView, 'columns', insertColumns);
        this.$set(this.manageView, 'viewTitle', '新增部门');
        this.isEdit = false;
        this.manageVisible = true;
      },
      
      // 打开编辑
      handleEdit() {
        this.$set(this.manageView, 'columns', editColumns);
        this.$set(this.manageView, 'viewTitle', '编辑部门');
        this.isEdit = true;
        this.manageVisible = true;
      },

      // 打开删除
      handleDelete() {
        this.$confirm('是否要删除该项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          return false;         
        });
      },

      // 关闭管理
      handleCloseManage() {
        // 销毁新增或编辑视图
        this.$set(this, 'manageView', {});
        this.manageVisible = false;
      },

      // 确定保存
      handleSubmit(cb) {
        this.handleCloseManage();
        cb();
      }
    }
  }
</script>

<style scoped lang="scss">
	@import 'style/mixins.scss';
</style>