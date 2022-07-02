<template>
  <div>
    <!-- 头部标签 -->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 个股研报
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--  -->
    <div class="container">
      <!-- 条件查询设置区 -->
      <div class="handle-box">
        <el-input
            v-model="param.title"
            placeholder="标题"
            class="handle-input mr10"
        ></el-input>
        <el-input
            v-model="param.stockCode"
            placeholder="代码"
            class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
        >搜索
        </el-button
        >

        <el-button type="warning" icon="el-icon-refresh" @click="reset"
        >重置
        </el-button
        >

      </div>
      <!-- 表单区 -->
      <el-table
          :data="tableData"
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          table-layout="auto"
          :row-class-name="tableRowClassName"
      >
        <el-table-column
            type="index"
            :index="indexMethod"
            label="ID"
            width="55"
            align="center"
        ></el-table-column>
        <el-table-column label="标题" show-overflow-tooltip="true">
          <template #default="scope">
            <div title="点击查看">
              <el-link type="primary" :underline="false" :href="scope.row.pdfUrl" target="_blank">{{
                  scope.row.title
                }}
              </el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="stockName"
            label="名称"
            width="180"
        ></el-table-column>

        <el-table-column
            prop="stockCode"
            label="代码"
            width="180"
        ></el-table-column>

        <el-table-column
            prop="orgSName"
            label="券商"
            width="180"
        ></el-table-column>
        <el-table-column
            prop="publishDate"
            label="时间"
            width="180"
        ></el-table-column>
      </el-table>

      <!-- 页码区 -->
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="param.pageNum"
            :page-size="param.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {pageQuery} from "../../api/stock";

export default {
  setup() {

    const param = reactive({
      title: "",
      stockCode: "",
      pageNum: 1,
      pageSize: 10,
    });

    const tableData = ref([]);
    const pageTotal = ref(0);

    const getData = () => {
      pageQuery(param).then((res) => {

        tableData.value = res.data.records;
        pageTotal.value = res.data.total || 50;
        console.log(tableData);
      })
    };

    getData();
    // 查询操作
    const handleSearch = () => {
      param.pageNum = 1;
      getData();
    };
    //重置
    const reset = () => {
      param.title = '';
      param.stockCode='';
    };

    const tableRowClassName = ({row, rowIndex}) => {
      if (row.reserved1 !== undefined) {
        return 'success-row'
      }
      return ''
    }

    // 分页导航
    const handlePageChange = (val) => {
      param.pageNum = val;
      getData();
    };
    // 点击记录
    const handleRead = (id) => {
      const param = {
        industryId: id,
      };
      readRecord(param);

      getData();
    }
    // 索引
    const indexMethod = (index) => {
      return index + 1;
    };

    return {
      param,
      tableData,
      pageTotal,
      getData,
      handleSearch,
      reset,
      handlePageChange,
      indexMethod,
      tableRowClassName

    };

  },
}
</script>

<style>
.el-table .success-row {
  background: #f0f9eb;
}
</style>
<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
  cursor: pointer;
}

.mr10 {
  margin-right: 10px;
}


</style>
