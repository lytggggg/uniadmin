<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="USCC" label="唯一标识">
        <uni-easyinput placeholder="唯一标识" v-model="formData.USCC"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="runstatus" label="运营状态">
        <uni-easyinput placeholder="运营状态" v-model="formData.runstatus"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="worknum" label="从业人员数">
        <uni-easyinput placeholder="从业人员数" v-model="formData.worknum"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="totolmoney" label="旅游总收入">
        <uni-easyinput placeholder="旅游总收入" v-model="formData.totolmoney"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="tikitmoney" label="门票收入">
        <uni-easyinput placeholder="门票收入" v-model="formData.tikitmoney"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="jiedaipeoplenum" label="接待游客人次">
        <uni-easyinput placeholder="接待游客人次" v-model="formData.jiedaipeoplenum"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="freetikitnum" label="免票人次">
        <uni-easyinput placeholder="免票人次" v-model="formData.freetikitnum"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="reportID" label="填报人工号">
        <uni-easyinput placeholder="填报人工号" v-model="formData.reportID"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="month" label="月份">
        <uni-easyinput placeholder="月份" v-model="formData.month"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
          <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/zhongdianjiancedanweibiao.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'zhongdianjiancedanweibiao';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "USCC": "",
        "runstatus": "",
        "worknum": "",
        "totolmoney": "",
        "tikitmoney": "",
        "jiedaipeoplenum": "",
        "freetikitnum": "",
        "reportID": "",
        "month": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>
