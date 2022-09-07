<template>
  <div>
    <!-- 头部标签 -->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 行业研报
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
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
        >搜索
        </el-button
        >
        <el-button type="primary" icon="el-icon-refresh" @click="zcSearch"
        >政策
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
              <el-link type="primary" :underline="false" :href="scope.row.pdfUrl" @click="handleRead(scope.row.id)"
                       target="_blank"
                       style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: block">{{
                  scope.row.title
                }}
              </el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="industryName"
            label="行业"
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
        <el-table-column
            prop="emRatingName"
            label="评级"
            width="100"
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
import {pageQuery, readRecord} from "../../api/industrystock";

export default {
  setup() {

    const param = reactive({
      title: "",
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
    const zcSearch = () => {
      param.pageNum = 1;
      param.title='政策';
      getData();
    }
    //重置
    const reset = () => {
      param.title = '';
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
      zcSearch,
      reset,
      handlePageChange,
      indexMethod,
      handleRead,
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
