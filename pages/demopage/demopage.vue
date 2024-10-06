<template>
	<view class="container">
		<view class="table">
			<!-- 表头 -->
			<view class="table-cell header">
				重点监测单位基本情况快速调查表（含A级景区、非A景区）
			</view>
			<view class="table-cell" style="display: flex; align-items: center; white-space: nowrap;">
				<span style="margin-right: 5px;">统一社会信用代码</span>
				<input type="text" v-model="formData.USCC" placeholder="请输入数额" style="flex: 1;" />
			</view>


			<view class="table-row header" style="display: flex;">
				<!-- 第一列占据四个单元格的宽度 -->
				<view class="table-cell" style="flex: 4.28;">单位名称</view>
				<!-- 第二列对齐第五列 -->
				<view class="table-cell" style="flex: 1;">月份</view>
			</view>
			<view class="table-row " style="display: flex;">
				<!-- 第一列占据四个单元格的宽度 -->
				<view class="table-cell" style="flex: 4.28;">
					<input type="text" v-model="formData.enterprise_Name" placeholder="请输入数额" />
				</view>
				<!-- 第二列对齐第五列 -->
				<view class="table-cell" style="flex: 1;">
					<input type="number" v-model="formData.month" placeholder="请输入数额" />
				</view>
			</view>
			<view class="table-row header" style="display: flex;">
				<!-- 第一列占据四个单元格的宽度 -->
				<view class="table-cell" style="flex: 4.28;">详细地址</view>
				<!-- 第二列对齐第五列 -->
				<view class="table-cell" style="flex: 1;">运营状态</view>
			</view>
			<view class="table-row " style="display: flex;">
				<!-- 第一列占据四个单元格的宽度 -->
				<view class="table-cell" style="flex: 4.28;">
					<input type="text" v-model="formData.enterprise_Address" placeholder="请输入数额" />
				</view>
				<!-- 第二列对齐第五列 -->
				<view class="table-cell" style="flex: 1;">
					<input type="text" v-model="formData.runstatus" placeholder="请输入数额" />
				</view>
			</view>

			<view class="table-row">
				<view class="table-cell"></view> <!-- 第一个单元格空白 -->
				<view class="table-cell">代码</view>
				<view class="table-cell">计量单位</view>
				<view class="table-cell">本季数额</view>
				<view class="table-cell">同比增长</view>
			</view>
			<!-- 从业人数行 -->
			<view class="table-row">
				<view class="table-cell">从业人数</view>
				<view class="table-cell">05</view>
				<view class="table-cell">人</view>
				<view class="table-cell">
					<input type="number" v-model="formData.worknum" placeholder="请输入数额" />
				</view>
				<view class="table-cell" style="display: flex; align-items: center; justify-content: center;">
					<input type="number" v-model="formData.worknumgrowth" placeholder="0"
						style="width: 50px; margin-right: 5px; text-align: right;" />
					<span>%</span>
				</view>

			</view>
			<!-- 总收入行 -->
			<view class="table-row">
				<view class="table-cell">总收入</view>
				<view class="table-cell">06</view>
				<view class="table-cell">千元</view>
				<view class="table-cell">
					<input type="number" v-model="formData.totolmoney" placeholder="请输入数额" />
				</view>
				<view class="table-cell" style="display: flex; align-items: center; justify-content: center;">
					<input type="number" v-model="formData.totolmoneygrowth" placeholder="0"
						style="width: 50px; margin-right: 5px; text-align: right;" />
					<span>%</span>
				</view>
			</view>
			<!-- //门票收入行 -->
			<view class="table-row">
				<view class="table-cell">门票收入</view>
				<view class="table-cell">07</view>
				<view class="table-cell">千元</view>
				<view class="table-cell">
					<input type="number" v-model="formData.tikitmoney" placeholder="请输入数额" />
				</view>
				<view class="table-cell" style="display: flex; align-items: center; justify-content: center;">
					<input type="number" v-model="formData.tikitmoneygrowth" placeholder="0"
						style="width: 50px; margin-right: 5px; text-align: right;" />
					<span>%</span>
				</view>
			</view>
			<!-- //接待游客人次 -->
			<view class="table-row">
				<view class="table-cell">接待旅客人次</view>
				<view class="table-cell">08</view>
				<view class="table-cell">人次</view>
				<view class="table-cell">
					<input type="number" v-model="formData.jiedaipeoplenum" placeholder="请输入数额" />
				</view>
				<view class="table-cell" style="display: flex; align-items: center; justify-content: center;">
					<input type="number" v-model="formData.jiedaipeoplegrowth" placeholder="0"
						style="width: 50px; margin-right: 5px; text-align: right;" />
					<span>%</span>
				</view>
			</view>
			<!-- //免票人次 -->
			<view class="table-row">
				<view class="table-cell">免票人次</view>
				<view class="table-cell">09</view>
				<view class="table-cell">人次</view>
				<view class="table-cell">
					<input type="number" v-model="formData.freetikitnum" placeholder="请输入数额" />
				</view>
				<view class="table-cell" style="display: flex; align-items: center; justify-content: center;">
					<input type="number" v-model="formData.freetikitgrowth" placeholder="0"
						style="width: 50px; margin-right: 5px; text-align: right;" />
					<span>%</span>
				</view>
			</view>
			<view class="table-row">
				<view class="table-cell">单位负责人
					<input type="text" v-model="formData.enterprise_leader" placeholder="请输入数额" />
				</view>
				<view class="table-cell">统计负责人
					<input type="text" v-model="formData.name" placeholder="请输入数额" />
				</view>
				<view class="table-cell">填表人
					<input type="text" v-model="formData.name" placeholder="请输入数额" />
				</view>
				<view class="table-cell">填表人电话
					<input type="number" v-model="formData.tel" placeholder="请输入数额" />
				</view>
				<view class="table-cell">
					报送日期
					<view>{{ formatDate(formData.report_date) }}</view>
				</view>

			</view>
			<!-- 空行 -->

		</view>
		<!-- 修改和返回按钮 -->
		<view class="button-container">
			<button class="update-button" @click="updateData">修改</button>
			<button class="update-button" @click="goBack">返回</button> <!-- 返回按钮样式与修改按钮相同 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					id: "",
					worknum: null,
					totolmoney: null,
					tikitmoney: null,
					jiedaipeoplenum: null,
					freetikitnum: null,
					name: null,
					enterprise_leader: null,
					report_date: null,
					tel: null,
					enterprise_Address: null,
					USCC: null,
					enterprise_Name: null,
					runstatus: null,
					month: null,
					worknumgrowth: null,
					totolmoneygrowth: null,
					tikitmoneygrowth: null,
					jiedaipeoplegrowth: null,
					freetikitgrowth: null,

				}
			}
		},
		onLoad(options) {
			const id = options.id;
			const USCC = options.USCC;
			
			// 获取db引用
			const db = uniCloud.database();
			db.collection('zhongdianjiancedanweibiao', 'user', 'enterprise')
				.where({
					_id: id
				})
				.get()
				.then((res) => {
					// 处理第一个查询结果
					this.formData.id = res.result.data[0]._id || 0;
					this.formData.worknum = res.result.data[0].worknum || 0;
					this.formData.totolmoney = res.result.data[0].totolmoney || 0;
					this.formData.tikitmoney = res.result.data[0].tikitmoney || 0;
					this.formData.jiedaipeoplenum = res.result.data[0].jiedaipeoplenum || 0;
					this.formData.freetikitnum = res.result.data[0].freetikitnum || 0;
					this.formData.report_date = res.result.data[0].report_date || 0;
					this.formData.tel = res.result.data[0].reportID[0].tel || 0;
					this.formData.name = res.result.data[0].reportID[0].name || 0;
					this.formData.enterprise_leader = res.result.data[0].USCC[0].enterprise_Leader || 0;
					this.formData.enterprise_Address = res.result.data[0].USCC[0].enterprise_Address || 0;
					this.formData.USCC = res.result.data[0].USCC[0].USCC || 0;
					this.formData.enterprise_Name = res.result.data[0].USCC[0].enterprise_Name || 0;
					this.formData.runstatus = res.result.data[0].runstatus || 0;
					this.formData.month = res.result.data[0].month || 0;
					console.log(USCC,this.formData.month-1,db.collection('zhongdianjiancedanweibiao').where({"USCC":"5002351","month":"2"}).get()
)
					// 在第一个查询完成后，执行第二个查询
					return db.collection('zhongdianjiancedanweibiao')
						.where({
							"USCC": String(USCC),
							"month": String(this.formData.month-1)  // 查询上一个月的记录
						})
						.get();
				})
				.then((res) => {
					// 处理第二个查询结果
					console.log(USCC,this.formData.month-1)
					if (res.result.data.length > 0) {
						// 获取上一个月的数据
						const lastMonthData = res.result.data[0];
							
						// 计算同比增长百分比
						const calculateGrowth = (current, last) => {
							return last ? ((current - last) / last) * 100 : 0; // 避免除零错误
						};

						// 更新同比增长
						this.formData.worknumgrowth = calculateGrowth(this.formData.worknum, lastMonthData.worknum).toFixed(2);
						this.formData.totolmoneygrowth = calculateGrowth(this.formData.totolmoney, lastMonthData
							.totolmoney).toFixed(2);
						this.formData.tikitmoneygrowth = calculateGrowth(this.formData.tikitmoney, lastMonthData
							.tikitmoney).toFixed(2);
						this.formData.jiedaipeoplegrowth = calculateGrowth(this.formData.jiedaipeoplenum, lastMonthData
							.jiedaipeoplenum).toFixed(2);
						this.formData.freetikitgrowth = calculateGrowth(this.formData.freetikitnum, lastMonthData
							.freetikitnum).toFixed(2);
					} else {
						// 如果没有找到上一个月的数据，设定增长率为 0
						this.formData.worknumgrowth = 0;
						this.formData.totolmoneygrowth = 0;
						this.formData.tikitmoneygrowth = 0;
						this.formData.jiedaipeoplegrowth = 0;
						this.formData.freetikitgrowth = 0;
					}
				})
				.catch((err) => {
					console.log(err.code); // 打印错误码
					console.log(err.message); // 打印错误内容
				});
		},
		methods: {
			formatDate(timestamp) {
				if (!timestamp) return ''; // 处理空值
				const date = new Date(timestamp); // 将时间戳转换为Date对象
				const year = date.getFullYear();
				const month = date.getMonth() + 1; // 月份是从0开始的，所以需要+1
				const day = date.getDate();
				return `${year}年${month}月${day}日`; // 返回格式化的日期
			},
			updateData() {
				console.log('准备更新的数据:', this.formData);
				// 打印将要更新的数据
				// 如果没有找到上一个月的数据，设定增长率为 0



				uniCloud.callFunction({
					name: "updatecloud", // 云函数名称
					data: {
						...this.formData
					}
				}).then(res => {
					console.log('更新sss成功', res);
					// 检查返回结果是否包含成功状态

					uni.showToast({
						title: '修改成功',
						icon: 'success',
						duration: 2000
					})

				}).catch(err => {
					console.error('更新失败', err);
					uni.showToast({
						title: '修改失败',
						icon: 'none',
						duration: 2000
					});
				});
			},
			goBack() {
				// 返回到指定页面
				uni.navigateTo({
					url: '../zhongdianjiancedanweibiao/list'
				});
			}
		}
	}
</script>

<style>
	.container {

		/* 高度自适应 */
		margin: 100;
		/* 居中对齐 */


		/* 从左侧向右偏移 25% */
		background-color: white;
		/* 背景色 */
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		/* 添加阴影效果 */
		z-index: 1000;
		/* 确保在其他元素之上 */

		/* 圆角 */
		overflow: hidden;
		/* 隐藏溢出内容 */
	}

	.table {
		width: 100%;
		border: 1px solid #ddd;
		border-collapse: collapse;
	}

	.table-row {
		display: flex;
		border-bottom: 1px solid #ddd;
	}

	.table-cell {
		flex: 1;
		padding: 12px;
		border-right: 1px solid #ddd;
		text-align: center;
	}

	.header {
		background-color: #f2f2f2;
		font-weight: bold;
	}

	.table-cell:last-child {
		border-right: none;
	}

	input {
		width: 100%;
		box-sizing: border-box;
	}

	.button-container {
		display: flex;
		/* 使用 flex 布局 */
		justify-content: center;
		/* 居中对齐按钮 */
		margin-top: 20px;
		/* 添加一些间距 */
	}

	.update-button {
		padding: 5px 30px;
		/* 调整按钮的内边距 */
		background-color: #007bff;
		/* 蓝色背景 */
		color: white;
		/* 白色字体 */
		border: none;
		border-radius: 5px;
		/* 圆角 */
		cursor: pointer;
		/* 鼠标悬停为指针 */
		width: auto;
		/* 使按钮宽度自适应内容 */
		max-width: 120px;
		/* 设置按钮的最大宽度 */
		margin: 0 5px;
		/* 按钮之间的间距 */
	}

	.update-button:hover {
		background-color: #0056b3;
		/* 悬停效果 */
	}
</style>