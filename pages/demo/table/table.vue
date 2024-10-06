<template>
	<view>
		<view class="uni-header">
			<view class="uni-group hide-on-phone">
				<view class="uni-title">{{$t('demo.table.title')}}</view>
			</view>
			<view class="uni-group">
				<!-- 输入框 -->
				<input class="uni-search" type="text" v-model="searchVal" @confirm="search" :placeholder="$t('common.placeholder.query')" />
				<!-- 搜索按钮 -->
				<button class="uni-button" type="default" size="mini" @click="search">{{$t('common.button.search')}}</button>
				<!-- 添加按钮 -->
				<button class="uni-button" type="primary" size="mini">{{$t('common.button.add')}}</button>
				<!-- 批量删除按钮 -->
				<button class="uni-button" type="warn" size="mini" @click="delTable">{{$t('common.button.batchDelete')}}</button>
			</view>
		</view>
		<view class="uni-container">
			<!-- 表格组件 -->
			<uni-table :loading="loading" border stripe type="selection" :emptyText="$t('common.empty')" @selection-change="selectionChange">
				<uni-tr>
					<!-- 表头列 -->
					<uni-th width="150" align="center">单位名称</uni-th>
					<uni-th width="150" align="center">单位类型</uni-th>
					<!-- <uni-th align="center">地址</uni-th> -->
					<!-- <uni-th width="204" align="center">设置</uni-th> -->
				</uni-tr>
				<uni-tr v-for="item in tableData" :key="item.id">
					<!-- 表格数据列 -->
					<uni-td>{{item.dwname}}</uni-td>
					<uni-td>
						<view class="name">{{item.dwtype}}</view>
					</uni-td>
					<!-- <uni-td>{{item.address}}</uni-td> -->
					<uni-td> 
						<view class="uni-group">
							<!-- 编辑按钮 -->
							<button class="uni-button" size="mini" type="primary">{{$t('common.button.edit')}}</button>
							<!-- 删除按钮 -->
							<button class="uni-button" size="mini" type="warn">{{$t('common.button.delete')}}</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<!-- <view class="uni-pagination-box"> -->
				<!-- 分页组件 -->
				<!-- <uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /> -->
			<!-- </view> -->
		</view>
		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
	</view>
</template>


<script>
	// 导入名为 "tableData" 的模块，路径为 './tableData.js'
	// import tableData from './tableData.js'
 
	// 导出默认模块
	export default {
		data() {
			return {
				title: 'Hello',
				tableData:[]
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name:"danweibiao",
				data:{}
			}).then(res=>{
				console.log(res)
				this.tableData=res.result.data
				
			})
		},
		methods: {
	
		}
	}
</script>


<style>
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}

	/* #endif */
</style>
