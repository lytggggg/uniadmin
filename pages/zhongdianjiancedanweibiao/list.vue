<template>
  <view>
    <view class="uni-header">
      <view class="uni-group">
        <view class="uni-title"></view>
        <view class="uni-sub-title"></view>
      </view>
      <view class="uni-group">
        <input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
        <button class="uni-button" type="default" size="mini" @click="search">搜索</button>
        <button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
        <button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length" @click="delTable">批量删除</button>
        <download-excel class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData" :type="exportExcel.type" :name="exportExcel.filename">
          <button class="uni-button" type="primary" size="mini">导出 Excel</button>
        </download-excel>
      </view>
    </view>
    <view class="uni-container">
      <unicloud-db ref="udb" :collection="collectionList" field="USCC,runstatus,worknum,totolmoney,tikitmoney,jiedaipeoplenum,freetikitnum,reportID,month" :where="where" page-data="replace"
        :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
        v-slot:default="{data,pagination,loading,error,options}" :options="options" loadtime="manual" @load="onqueryload">
        <uni-table ref="table" :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection" @selection-change="selectionChange">
          <uni-tr>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'USCC')">唯一标识</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'runstatus')" sortable @sort-change="sortChange($event, 'runstatus')">运营状态</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'worknum')" sortable @sort-change="sortChange($event, 'worknum')">从业人员数</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'totolmoney')" sortable @sort-change="sortChange($event, 'totolmoney')">旅游总收入</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'tikitmoney')" sortable @sort-change="sortChange($event, 'tikitmoney')">门票收入</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'jiedaipeoplenum')" sortable @sort-change="sortChange($event, 'jiedaipeoplenum')">接待游客人次</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'freetikitnum')" sortable @sort-change="sortChange($event, 'freetikitnum')">免票人次</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'reportID')" sortable @sort-change="sortChange($event, 'reportID')">填报人工号</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'month')" sortable @sort-change="sortChange($event, 'month')">月份</uni-th>
            <uni-th align="center">详细</uni-th>
			<uni-th align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,index) in data" :key="index">
            <uni-td align="center">{{item.USCC[0].enterprise_Name}}</uni-td>
            <uni-td align="center">{{item.runstatus}}</uni-td>
            <uni-td align="center">{{item.worknum}}</uni-td>
            <uni-td align="center">{{item.totolmoney}}</uni-td>
            <uni-td align="center">{{item.tikitmoney}}</uni-td>
            <uni-td align="center">{{item.jiedaipeoplenum}}</uni-td>
            <uni-td align="center">{{item.freetikitnum}}</uni-td>
            <uni-td align="center">{{item.reportID[0].name}}</uni-td>
            <uni-td align="center">{{item.month}}</uni-td>
			<uni-td align="center">
			  <view class="uni-group">
				<button @click="tiaozhuan(item._id,item.USCC[0].USCC)" class="uni-button" size="mini" type="primary">详细</button>
			  
			  </view>
			</uni-td>
            <uni-td align="center">
              <view class="uni-group">
                <button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button" size="mini" type="primary">修改</button>
                <button @click="confirmDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
              </view>
            </uni-td>
          </uni-tr>
        </uni-table>
        <view class="uni-pagination-box">
          <uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current" :total="pagination.count" @change="onPageChanged" />
        </view>
      </unicloud-db>
    </view>
  </view>
</template>

<script>
  import { enumConverter, filterToWhere } from '../../js_sdk/validator/zhongdianjiancedanweibiao.js';

  const db = uniCloud.database()
  // 表查询配置
  const dbOrderBy = '' // 排序字段
  const dbSearchFields = [] // 模糊搜索字段，支持模糊搜索的字段列表。联表查询格式: 主表字段名.副表字段名，例如用户表关联角色表 role.role_name
  // 分页配置
  const pageSize = 20
  const pageCurrent = 1

  const orderByMapping = {
    "ascending": "asc",
    "descending": "desc"
  }

  export default {
    data() {
      return {
        collectionList: ["zhongdianjiancedanweibiao","enterprise","user"],
        query: '',
        where: '',
        orderby: dbOrderBy,
        orderByFieldName: "",
        selectedIndexs: [],
        options: {
          pageSize,
          pageCurrent,
          filterData: {},
          ...enumConverter
        },
        imageStyles: {
          width: 64,
          height: 64
        },
        exportExcel: {
          "filename": "zhongdianjiancedanweibiao.xls",
          "type": "xls",
          "fields": {
            "唯一标识": "USCC",
            "运营状态": "runstatus",
            "从业人员数": "worknum",
            "旅游总收入": "totolmoney",
            "门票收入": "tikitmoney",
            "接待游客人次": "jiedaipeoplenum",
            "免票人次": "freetikitnum",
            "填报人工号": "reportID",
            "月份": "month"
          }
        },
        exportExcelData: []
      }
    },
    onLoad() {
      this._filter = {}
    },
    onReady() {
      this.$refs.udb.loadData()
    },
    methods: {
      onqueryload(data) {
        this.exportExcelData = data
      },
      getWhere() {
        const query = this.query.trim()
        if (!query) {
          return ''
        }
        const queryRe = new RegExp(query, 'i')
        return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
      },
      search() {
        const newWhere = this.getWhere()
        this.where = newWhere
        this.$nextTick(() => {
          this.loadData()
        })
      },
      loadData(clear = true) {
        this.$refs.udb.loadData({
          clear
        })
      },
      onPageChanged(e) {
        this.selectedIndexs.length = 0
        this.$refs.table.clearSelection()
        this.$refs.udb.loadData({
          current: e.current
        })
      },
	  tiaozhuan(id,USCC) {
	  	  				uni.navigateTo({
	  	  					url: '../demopage/demopage?id=' + id+'&USCC='+USCC,
	  	  					events: {
	  	  						refreshData: () => {
	  	  							this.loadData(true)
	  	  						}
	  	  					}
	  	  				})
	  	  			},
      navigateTo(url, clear) {
        // clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
        uni.navigateTo({
          url,
          events: {
            refreshData: () => {
              this.loadData(clear)
            }
          }
        })
      },
      // 多选处理
      selectedItems() {
        var dataList = this.$refs.udb.dataList
        return this.selectedIndexs.map(i => dataList[i]._id)
      },
      // 批量删除
      delTable() {
		  this.collectionList = "zhongdianjiancedanweibiao";
        this.$refs.udb.remove(this.selectedItems(), {
          success:(res) => {
            this.$refs.table.clearSelection()
          }
        })
      },
      // 多选
      selectionChange(e) {
        this.selectedIndexs = e.detail.index
      },
      confirmDelete(id) {
		  this.collectionList = "zhongdianjiancedanweibiao";
        this.$refs.udb.remove(id, {
          success:(res) => {
            this.$refs.table.clearSelection()
          }
        })
      },
      sortChange(e, name) {
        this.orderByFieldName = name;
        if (e.order) {
          this.orderby = name + ' ' + orderByMapping[e.order]
        } else {
          this.orderby = ''
        }
        this.$refs.table.clearSelection()
        this.$nextTick(() => {
          this.$refs.udb.loadData()
        })
      },
      filterChange(e, name) {
        this._filter[name] = {
          type: e.filterType,
          value: e.filter
        }
        let newWhere = filterToWhere(this._filter, db.command)
        if (Object.keys(newWhere).length) {
          this.where = newWhere
        } else {
          this.where = ''
        }
        this.$nextTick(() => {
          this.$refs.udb.loadData()
        })
      }
    }
  }
</script>

<style>
</style>
