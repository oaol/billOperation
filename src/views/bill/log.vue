<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.startTime" type="datetime" style="width: 220px;" class="filter-item" placeholder="Please pick a start date"/>
      <el-date-picker v-model="listQuery.endTime" type="datetime" style="width: 220px;" class="filter-item" placeholder="Please pick a end date"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column :label="$t('log.id')" prop="id" sortable="custom" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.sqlDate')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sqlDate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.hTime')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.hTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.period')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.period }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.mTime')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.execStart')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.execStart | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.execEnd')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.execEnd | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.useTime')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.useTime | parseTime('{h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.flag')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.flag }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>

import { fetchList } from '@/api/log'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Log',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },

  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        startTime: undefined,
        entTime: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(JSON.stringify(response))
        this.list = response.data.results.content

       // console.log(data.items)
        this.total =  response.data.results.totalElements
        console.log(data.total)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
